<!--
 * fileName       : MyPage
 * author         : Heeseon
 * date           : 2024-09-05
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-05        Heeseon       최초 생성
-->

<template>
    <div class="mypage">
        <!-- MemberProfileCard에 memberProfile 데이터를 전달 -->
        <MemberProfileCard :memberProfile="memberProfile" />

      <h3>관심 있는 프로젝트</h3>
      <div v-if="favoriteProjects.length > 0">
        <ProjectList :projects="favoriteProjects" />
      </div>
      <div v-else class="emptyList">관심 있는 프로젝트가 없습니다.</div>

      <h3>내 프로젝트</h3>
      <div v-if="myProjects.length > 0">
        <ProjectList :projects="myProjects" />
      </div>
      <div v-else class="emptyList">내 프로젝트가 없습니다.</div>

      <h3>참여한 프로젝트</h3>
      <div v-if="joinedProjects.length > 0">
        <ProjectList :projects="joinedProjects" />
      </div>
      <div v-else class="emptyList">참여한 프로젝트가 없습니다.</div>

      <h3>완료된 프로젝트</h3>
      <div v-if="completedProjects.length > 0">
        <ProjectList :projects="completedProjects" />
      </div>
      <div v-else class="emptyList"> 완료된 프로젝트가 없습니다.</div>
    </div>
</template>
<script>
import ProjectList from '@/components/ProjectCardList.vue';
import MemberProfileCard from '@/components/mypage/MemberProfileCard.vue';
import axiosInstance from '@/axiosInstance';

export default {
    name: 'MyPage',
    components: {
        MemberProfileCard,
        ProjectList,
    },
    data() {
        return {
            // 멤버 프로필 정보
            memberProfile: {},
            // 각 프로젝트 리스트
            favoriteProjects: [],
            myProjects: [],
            joinedProjects: [],
            completedProjects: [],
        };
    },
    mounted() {
        this.fetchMemberData();
        this.fetchFavoriteProjects(); // '좋아요'한 프로젝트 가져오기
        this.fetchMyProjects(); // '내' 프로젝트 가져오기
        this.fetchJoinedProjects(); // '참여한' 프로젝트 가져오기
    },
    methods: {
        fetchMemberData() {
            axiosInstance
                .get('/api/users/me') // API URL 수정
                .then((response) => {
                    this.memberProfile = response.data; // API에서 가져온 데이터로 memberProfile 업데이트
                })
                .catch((error) => {
                    console.error('멤버 정보를 가져오는 중 오류 발생: ', error);
                });
        },
        fetchFavoriteProjects() {
            axiosInstance
                .get('/api/projects/my/like', {
                    params: {
                        page: 0, // 페이지 번호 (기본값으로 첫 번째 페이지)
                        size: 4, // 한 번에 가져올 프로젝트 수
                    },
                })
                .then((response) => {
                    this.favoriteProjects = response.data.content; // '좋아요'한 프로젝트 리스트
                })
                .catch((error) => {
                    console.error('좋아요한 프로젝트를 가져오는 중 오류 발생: ', error);
                });
        },
        fetchMyProjects() {
            axiosInstance
                .get('/api/projects/my', {
                    params: {
                        status: 0, // 상태 코드 (0: 내가 만든 프로젝트)
                        page: 0, // 페이지 번호 (기본값으로 첫 번째 페이지)
                        size: 4, // 한 번에 가져올 프로젝트 수
                    },
                })
                .then((response) => {
                    this.myProjects = response.data.content; // '내' 프로젝트 리스트
                })
                .catch((error) => {
                    console.error('내 프로젝트를 가져오는 중 오류 발생: ', error);
                });
        },
        fetchJoinedProjects() {
            axiosInstance
                .get('/api/projects/my', {
                    params: {
                        status: 1, // 상태 코드 (1: 내가 참여한 프로젝트)
                        page: 0, // 페이지 번호 (기본값으로 첫 번째 페이지)
                        size: 4, // 한 번에 가져올 프로젝트 수
                    },
                })
                .then((response) => {
                    this.joinedProjects = response.data.content; // '참여한' 프로젝트 리스트
                })
                .catch((error) => {
                    console.error('참여한 프로젝트를 가져오는 중 오류 발생: ', error);
                });
        },
    },
};
</script>
<style scoped>
.mypage {
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
}
.project-section {
    margin-bottom: 30px; /* 각 프로젝트 섹션 사이에 여백 추가 */
}

v-col {
    margin-bottom: 20px;
}

h3 {
    margin-top: 40px;
    margin-left: 20px;
    margin-bottom: 30px;
    font-weight: bold;
}
.emptyList{
    margin-left: 20px;
}


@media (max-width: 1200px) {
    .mypage {
        padding: 15px; /* Reduce padding for smaller screens */
    }

    h3 {
        margin-left: 15px; /* Adjust margins */
    }
}

@media (max-width: 768px) {
    .mypage {
        padding: 10px;
    }

    h3 {
        margin-left: 10px;
    }


    v-col {
        margin-bottom: 15px;
    }
}

@media (max-width: 480px) {
    .mypage {
        padding: 5px;
    }

    h3 {
        margin-left: 5px;
        margin-top: 20px;
    }

    v-col {
        margin-bottom: 10px;
    }
}
</style>
