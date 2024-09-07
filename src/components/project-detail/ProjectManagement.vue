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
            initialDisplayCount: 3,
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
        startProject() {
            this.$axios
                .post('/api/projects/start', { projectId: this.$route.params.projectId })
                .then((response) => {
                    console.log('프로젝트가 시작되었습니다:', response.data);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('프로젝트 시작 오류:', error);
                });
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
        fetchApproval(member, value) {
            const data = {
                projectId: this.$route.params.projectId,
                memberId: member.projectMemberId,
                acceptStatus: value,
            };
            this.$axios
                .put(`/api/projects/applications`, data)
                .then(() => {
                    console.log('멤버 스테이터스가 업데이트 되었습니다.', data.acceptStatus === 1 ? '승인됨.' : '거절됨.');
                    this.removeMemberFromList(member);
                })
                .catch((error) => {
                    console.error('멤버 스테이터스를 업데이트 하던 중 에러 발생', error);
                });
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
        <v-row v-for="(group, index) in groupedMembers" :key="index" class="mb-4">
            <v-col cols="12">
                <h2>{{ group.jobName }}</h2>
            </v-col>
            <v-col v-for="(member, i) in group.members.slice(0, group.showAll ? group.members.length : group.initialDisplayCount)" :key="i" cols="12" sm="6" md="4">
                <project-management-card :member="member" @approve-member="handleApprove" @reject-member="handleReject" />
            </v-col>
            <v-col cols="12" v-if="group.members.length > group.initialDisplayCount" class="d-flex justify-center">
                <v-btn text color="lightgray" @click="toggleShowAll(index)" class="toggle-btn">
                    {{ group.showAll ? '접기' : '더보기' }}
                    <span class="arrow-icon" :class="{ 'rotate-down': !group.showAll, 'rotate-up': group.showAll }">{{ group.showAll ? '<' : '<' }}</span>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.toggle-btn {
    font-size: 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #b0b0b0;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.toggle-btn:hover {
    background-color: #e0c3b0;
    border-radius: 8px;
    transform: scale(1.05);
}

.arrow-icon {
    display: inline-block;

    margin-left: 8px;
    transition: transform 0.3s ease;
}

.toggle-btn:hover .rotate-down {
    transform: rotate(-90deg);
}
.toggle-btn:hover .rotate-up {
    transform: rotate(90deg);
}
</style>
