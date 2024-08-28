<!--
 * fileName       : ProjectInfo
 * author         : JooYoon
 * date           : 2024-08-28
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-28        JooYoon       최초 생성
-->
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2>리더 정보</h2>
                <v-card flat>
                    <v-card-text>
                        <v-avatar>
                            <v-img :src="project.leader.memberImg"></v-img>
                        </v-avatar>
                        <p>{{ project.leader.memberNickname }}</p>
                        <v-chip v-for="tech in project.leader.techStack" :key="tech" class="ma-1">
                            {{ tech }}
                        </v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2>모집 현황</h2>
                <v-list>
                    <v-list-item v-for="recruitment in project.recruitments" :key="recruitment.jobId">
                        <v-list-item-content>
                            <v-list-item-title>{{ recruitment.jobName }}</v-list-item-title>
                            <v-list-item-subtitle> {{ recruitment.members.length }} / {{ recruitment.jobCount }} </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2>프로젝트 소개</h2>
                <p>{{ project.description }}</p>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2>기술 스택</h2>
                <v-chip v-for="tech in project.projectTechStack" :key="tech" class="ma-1">
                    {{ tech }}
                </v-chip>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2>참여 중인 멤버</h2>
                <v-list>
                    <v-list-item v-for="recruitment in project.recruitments" :key="recruitment.jobId">
                        <v-list-item-content>
                            <v-list-item-title>{{ recruitment.jobName }}</v-list-item-title>
                            <v-list-item-group>
                                <v-list-item v-for="member in recruitment.members" :key="member.memberId">
                                    <v-list-item-avatar>
                                        <v-img :src="member.memberImg"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ member.memberNickname }}</v-list-item-title>
                                        <v-list-item-subtitle>
                                            <v-chip v-for="tech in member.techStack" :key="tech" x-small class="mr-1">
                                                {{ tech }}
                                            </v-chip>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'ProjectInfo',
    props: {
        project: {
            type: Object,
        },
    },
};
</script>

<style scoped></style>
