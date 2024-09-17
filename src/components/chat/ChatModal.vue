<!--
 * fileName       : ChatModal
 * author         : yunbin
 * date           : 2024-09-03
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-03        yunbin       최초 생성
 * 2024-09-05        yunbin       웹 소켓 연결
 * 2024-09-07        yunbin       대화 목록 요청
 * 2024-09-08        yunbin       coffee chat 버튼 눌렀을 때 로직 추가
 * 2024-09-09        yunbin       메세지 전송
 * 2024-09-11        yunbin       selectedChatRoom vuex로 변경
-->
<script>
import ChatCompo from '@/components/chat/ChatCompo.vue';
import ChatMessage from '@/components/chat/ChatMessage.vue';
import { getSocket } from '../../socket.js';
import axios from 'axios';
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import axiosInstance from '@/plugins/axios_custom';

export default {
    name: 'ChatModal',
    components: { ChatMessage, ChatCompo },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        member: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            isVisible: this.value,
            message: '', // 입력된 메시지
            messages: [], // 현재 선택된 채팅방의 메시지 목록
            chatList: [], // 전체 채팅방 목록
            currentUser: '',
            targetMemberId: null,
            socket: null,
            hasFetchedChatList: false,
        };
    },
    methods: {
        ...mapActions('chat', {
            setSelectedChatRoom: 'selectChatRoom', // Vuex 액션에 별칭 부여
        }),
        connectSocket() {
            this.socket = getSocket();

            this.socket.on('private message', (msgObj) => {
                console.log('메시지 수신:', msgObj);

                // 현재 선택된 채팅방의 메시지라면 추가
                if (this.selectedChatRoom && this.selectedChatRoom.room_id === msgObj.roomId) {
                    this.messages.push({
                        sender_id: msgObj.from,
                        content: msgObj.message,
                        created_at: new Date(),
                    });
                    this.$nextTick(() => {
                        const chatContainer = this.$el.querySelector('.pa-0 div');
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                    });
                } else {
                    const chatRoomIndex = this.chatList.findIndex((chat) => chat.room_id === msgObj.roomId);
                    if (chatRoomIndex !== -1) {
                        this.chatList[chatRoomIndex].messages.push({
                            sender_id: msgObj.from,
                            content: msgObj.message,
                            created_at: new Date(),
                        });

                        // // 마지막 메시지를 기준으로 대화 목록을 정렬
                        // this.chatList.sort((a, b) => {
                        //   const lastMessageA = a.messages.length > 0 ? moment(a.messages[a.messages.length - 1].created_at) : moment(0);
                        //   const lastMessageB = b.messages.length > 0 ? moment(b.messages[b.messages.length - 1].created_at) : moment(0);
                        //   return lastMessageB - lastMessageA;
                        // });
                    }
                }
            });
        },
        // 메세지 보내기
        async sendMessage() {
            if (this.message.trim() !== '') {
                // 새로 생성된 채팅방일 경우, 먼저 방을 생성한 후 메시지 전송
                if (!this.selectedChatRoom || this.selectedChatRoom.room_id.startsWith('temp_room_')) {
                    // 새로운 채팅방을 생성
                    try {
                        const createRoomResponse = await axiosInstance.post('/node-api/private-chat-rooms', {
                            participants: [this.currentUser._id, this.member.memberId],
                        });

                        if (createRoomResponse.status === 201) {
                            const newRoom = {
                                room_id: createRoomResponse.data.room_id,
                                participants: [this.currentUser._id, this.member.memberId],
                                messages: [],
                            };

                            // 방 생성 후 selectedChatRoom 업데이트
                            this.handleRoomSelection(newRoom);

                            if (newRoom && this.socket) {
                                console.log(`방에 참가 중: ${newRoom.room_id}`);
                                this.socket.emit('join room', newRoom.room_id);
                            }

                            // 방 생성 후 메시지 전송
                            await this.sendMessageToServer(this.message, newRoom.room_id);
                        }
                    } catch (error) {
                        console.error('Error creating chat room:', error);
                    }
                } else {
                    // 기존 채팅방이 있는 경우 메시지만 전송
                    console.log('채팅방 id ', this.selectedChatRoom.room_id);
                    await this.sendMessageToServer(this.message, this.selectedChatRoom.room_id);
                }

                // 메시지 전송 후 입력 필드 초기화
                this.message = '';
            }
        },
        // 메시지를 서버에 전송하고 DB에 저장하는 함수
        async sendMessageToServer(message, roomId) {
            try {
                console.log(message, roomId);
                await axios.post('/node-api/messages', {
                    chat_room_id: roomId,
                    sender_id: this.currentUser._id,
                    sender_nickname: this.currentUser.nickname,
                    content: message,
                });

                // 소켓을 통해 채팅방(room)에 메시지 전송
                this.socket.emit('private message', {
                    roomId: roomId, // 채팅방 ID
                    from: this.currentUser._id, // 보낸 사람 ID
                    fromNickname: this.currentUser.nickname, // 보낸 사람 닉네임
                    fromImgUrl: this.currentUser.img_url, // 보낸 사람 이미지 URL
                    message: message, // 메시지 내용
                });

                this.$nextTick(() => {
                    const chatContainer = this.$el.querySelector('.pa-0 div');
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                });
            } catch (error) {
                console.error('Error sending message:', roomId);
            }
        },
        closeModal() {
            this.isVisible = false;
            this.setSelectedChatRoom(null);
        },
        handleMemberChat() {
            console.log('modal', this.member.memberId);
            console.log('chat list', this.chatList);
            const existingChatRoom = this.chatList.find((chat) => chat.participants.some((participant) => String(participant._id) === String(this.member.memberId)));
            console.log(existingChatRoom);

            if (existingChatRoom) {
                // 이미 채팅방이 존재하면 그 채팅방을 선택
                this.handleRoomSelection(existingChatRoom);
            } else {
                // 채팅방이 없으면 임시 채팅방 생성
                const tempParticipant = {
                    _id: this.member.memberId,
                    nickname: this.member.memberNickname,
                    img_url: this.member.memberImg,
                };

                const tempChatRoom = {
                    room_id: `temp_room_${Date.now()}`, // 임시 방 ID
                    participants: [tempParticipant], // props로 전달된 멤버
                    messages: [], // 빈 메시지 배열로 시작
                };

                // 채팅 목록에 추가하고 자동 선택
                this.chatList.unshift(tempChatRoom);
                this.handleRoomSelection(tempChatRoom);
            }
        },
        async getChatList() {
            try {
                const response = await axiosInstance.get('/node-api/private-chat-rooms');

                if (response.status === 200) {
                    console.log('getChatList', response.data);
                    this.chatList = response.data.chatRoom;
                    this.currentUser = response.data.currentUser;

                    // 마지막 메시지 기준으로 채팅방을 정렬
                    this.chatList.sort((a, b) => {
                        const lastMessageA = a.messages.length > 0 ? moment(a.messages[a.messages.length - 1].created_at) : moment(0);
                        const lastMessageB = b.messages.length > 0 ? moment(b.messages[b.messages.length - 1].created_at) : moment(0);
                        return lastMessageB - lastMessageA; // 최신 메시지가 먼저 오게 정렬
                    });

                    if (this.member && Object.keys(this.member).length > 0) {
                        this.handleMemberChat();
                    }
                }
            } catch (error) {
                console.error('Error getting user data:', error);
            }
        },
        handleRoomSelection(chat) {
            this.setSelectedChatRoom(chat); // Vuex에 상태 저장
            this.messages = chat.messages;

            // if (chat && this.socket) {
            //   console.log(`방에 참가 중: ${chat.room_id}`);
            //   this.socket.emit('join room', chat.room_id);
            // }
        },
        groupMessagesByDate() {
            return this.messages.reduce((groups, message) => {
                const date = moment(message.created_at).format('YYYY년 M월 D일');
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(message);
                return groups;
            }, {});
        },
    },
    watch: {
        value(val) {
            this.isVisible = val;
        },
        isVisible(val) {
            if (val && !this.hasFetchedChatList) {
                this.connectSocket(); // 소켓 연결
                this.getChatList().then(() => {
                    this.hasFetchedChatList = true;
                });
            } else {
                // 이미 채팅 목록을 가져왔으면 member에 맞는 채팅방을 선택
                if (this.member && Object.keys(this.member).length > 0) {
                    this.handleMemberChat();
                }
            }
            this.$emit('input', val);
        },
    },
    computed: {
        ...mapGetters('chat', ['selectedChatRoom']),
    },
};
</script>

<template>
    <div v-if="isVisible" class="chat-modal-wrap">
        <v-card class="chat-modal mb-0">
            <v-row no-gutters>
                <v-col cols="4">
                    <v-card-title class="headline">
                        <v-btn icon @click="closeModal">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        대화 목록
                    </v-card-title>
                    <v-divider></v-divider>
                    <div v-for="chat in chatList" :key="chat.room_id" @click="handleRoomSelection(chat)">
                        <ChatCompo
                            :chat="chat"
                            :backColor="selectedChatRoom && selectedChatRoom.room_id === chat.room_id ? '#8D6E63' : '#D7CCC8'"
                            :textColor="selectedChatRoom && selectedChatRoom.room_id === chat.room_id ? '#D7CCC8' : '#8D6E63'"
                        ></ChatCompo>
                    </div>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col v-if="selectedChatRoom" cols="8">
                    <v-card-title class="headline">
                        <v-avatar size="36">
                            <img :src="selectedChatRoom.participants[0].img_url" alt="profile_img" />
                        </v-avatar>
                        <div class="chat-title">{{ selectedChatRoom.participants[0].nickname }}님과의 대화</div>
                        <v-spacer></v-spacer>
                        <v-btn icon color="#6D4C41">
                            <v-icon x-large>mdi-logout</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="pa-0">
                        <div :style="{ height: '450px', overflowY: 'auto' }">
                            <div v-for="(msgs, date) in groupMessagesByDate()" :key="date">
                                <div class="text-center my-2">
                                    <div class="date-label">{{ date }}</div>
                                </div>
                                <div v-for="(msg, index) in msgs" :key="index">
                                    <div>
                                        <ChatMessage
                                            :senderImage="msg.sender_id === currentUser._id ? currentUser.img_url : selectedChatRoom.participants[0].img_url"
                                            :message="msg"
                                            :currentUser="currentUser._id"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-textarea auto-grow v-model="message" placeholder="메시지를 입력하세요" @keyup.enter="sendMessage" clearable hide-details></v-textarea>
                        <v-btn icon @click="sendMessage" color="#8D6E63">
                            <v-icon x-large>mdi-send-circle</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-col>
                <v-col cols="8" v-else>
                    <div class="empty-chat-space"></div>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<style scoped>
.chat-modal-wrap {
    position: fixed;
    width: 900px;
    height: 670px;
    bottom: 0;
    right: 1px;
    padding: 0;
    margin: 0;
    z-index: 2;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); /* 모달에 그림자 추가 */
}
.chat-title {
    margin-left: 10px;
}
.date-label {
    display: inline-block;
    padding: 4px 30px;
    background-color: #e0e0e0;
    border-radius: 24px;
    font-size: 0.8rem;
    color: #666;
    margin: 0 auto;
}
.empty-chat-space {
    height: 670px;
    /*display: flex;
    justify-content: center;
    align-items: center;
    color: #bbb;
    font-size: 1.5rem;*/
}
</style>
