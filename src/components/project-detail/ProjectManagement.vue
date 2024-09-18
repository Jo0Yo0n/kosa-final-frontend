<!--
 * fileName       : ProjectManagement
 * author         : Yeong-Huns
 * date           : 2024-09-06
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-06        Yeong-Huns       최초 생성
-->
<script>
import ProjectManagementCard from '../ProjectManagementCard.vue';
import CommonButton from '@/components/common/button/CommonButton.vue';
import axiosInstance from '@/axiosInstance';
//import axiosCustom from '@/plugins/axios_custom';
export default {
    name: 'ProjectManagement',
    components: {
        CommonButton,
        ProjectManagementCard,
    },
    props: {
        project_recruitment: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            initialDisplayCount: 4,
            groupedMembers: [],
        };
    },
    watch: {
        project_recruitment: {
            handler() {
                this.updateGroupedMembers();
            },
            immediate: true,
        },
    },

    methods: {
        updateGroupedMembers() {
            this.groupedMembers = this.project_recruitment.reduce((acc, member) => {
                const group = acc.find((g) => g.jobName === member.jobName);
                if (group) {
                    group.members.push(member);
                } else {
                    acc.push({
                        jobName: member.jobName,
                        members: [member],
                        showAll: false,
                        initialDisplayCount: this.initialDisplayCount,
                    });
                }
                return acc;
            }, []);
            this.groupedMembers.sort((a, b) => b.jobName.localeCompare(a.jobName, 'ko')); // 정렬
        },
        toggleShowAll(index) {
            this.$set(this.groupedMembers, index, {
                ...this.groupedMembers[index],
                showAll: !this.groupedMembers[index].showAll,
            });
        },
        async startProject() {
            try {
                const response = await axiosInstance.post('/api/projects/start', { projectId: this.$route.params.projectId });
                console.log('프로젝트가 시작되었습니다:', response.data);
                window.location.reload();
            } catch (error) {
                console.error('프로젝트 시작 오류:', error);
            }
        },
        handleApprove(member) {
            const value = 1;
            console.log('승인 이벤트 발생');
            this.fetchApproval(member, value);
        },
        handleReject(member) {
            const value = 0;
            console.log('거절 이벤트 발생');
            this.fetchApproval(member, value);
        },
        async fetchApproval(member, value) {
            const data = {
                projectId: this.$route.params.projectId,
                jobId: member.jobId,
                memberId: member.projectMemberId,
                acceptStatus: value,
            };
            try {
                await axiosInstance.put(`/api/projects/applications`, data);
                console.log('멤버 스테이터스가 업데이트 되었습니다.', data.acceptStatus === 1 ? '승인됨.' : '거절됨.');
                this.removeMemberFromList(member);
            } catch (error) {
                console.error('멤버 스테이터스를 업데이트 하던 중 에러 발생', error);
            }
        },
        removeMemberFromList(member) {
            this.groupedMembers.forEach((group) => {
                group.members = group.members.filter((m) => m.projectMemberId !== member.projectMemberId);
            });
            this.groupedMembers = this.groupedMembers.filter((group) => group.members.length > 0);
        },
    },
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex justify-end mb-3">
                <common-button @click="startProject">프로젝트 시작</common-button>
            </v-col>
        </v-row>
        <template v-if="groupedMembers.length > 0">
            <v-row v-for="(group, index) in groupedMembers" :key="index" class="mb-4">
                <v-col cols="12">
                    <h2>{{ group.jobName }}</h2>
                </v-col>
                <v-col v-for="(member, i) in group.members.slice(0, group.showAll ? group.members.length : group.initialDisplayCount)" :key="i" cols="12" sm="6" md="3">
                    <project-management-card :member="member" @approve-member="handleApprove" @reject-member="handleReject" />
                </v-col>
                <div class="more-button-container" v-if="group.members.length > group.initialDisplayCount">
                    <v-btn @click="toggleShowAll(index)" class="my-button">
                        {{ group.showAll ? '접기' : '더보기' }}
                    </v-btn>
                </div>
            </v-row>
        </template>
        <div v-else class="mt-5">
            <v-alert type="info" color="green" text>아직 지원한 멤버가 없어요.</v-alert>
        </div>
    </v-container>
</template>

<style scoped>
.more-button-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
}

.my-button {
    padding: 10px 20px;
    margin-top: 20px;
    background-color: transparent !important;
    color: #6f4a3d;
    cursor: pointer;
    border: none !important;
    border-radius: 20px;
    box-shadow: none;
}

.my-button:hover {
    background-color: rgba(128, 128, 128, 0.1);
    color: black;
}
</style>
