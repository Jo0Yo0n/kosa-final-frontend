<!--
 * fileName       : ChatCompo
 * author         : yunbin
 * date           : 2024-09-04
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-04        yunbin       최초 생성
-->
<script>
export default {
    name: 'ChatCompo',
    data() {
        return {
            items: [1, 2, 3, 4], // 반복되는 항목의 수
        };
    },
    props: {
        backColor: {
            type: String,
            default: '#8d6e63',
        },
        textColor: {
            type: String,
            default: '#d7ccc8',
        },
    },
};
</script>

<template>
    <div class="chat-compo-wrap">
        <v-row>
            <v-col class="pb-0">
                <div class="chat-compo pa-4" :style="{ backgroundColor: backColor }">
                    <v-row class="align-center">
                        <v-col cols="2">
                            <v-avatar size="48">
                                <img src="https://image.fnnews.com/resource/media/image/2023/08/12/202308121347460461_l.jpg" alt="프로필 이미지" />
                            </v-avatar>
                        </v-col>
                        <v-col cols="1">
                            <v-spacer></v-spacer>
                        </v-col>
                        <v-col cols="9">
                            <v-row no-gutters>
                                <div class="text-h6 m-0">닉네임</div>
                                <v-spacer></v-spacer>
                                <div class="text-caption" :style="{ color: textColor }">9시간 전</div>
                            </v-row>
                            <v-row no-gutters>
                                <div class="text-subtitle-2 m-0">마지막 대화 내용</div>
                            </v-row>
                            <v-row no-gutters>
                                <div class="text-caption mt-1" :style="{ color: textColor }">마지막 접속: 24.08.13 10:40</div>
                                <v-spacer></v-spacer>
                                <v-icon>mdi-logout</v-icon>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped></style>
