<!--
 * fileName       : ProjectMember
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
-->
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ProjectRecruitment',
    computed: {
        ...mapGetters('project', ['recruitmentRoles', 'roleOptions', 'totalCount']),
    },
    methods: {
        ...mapActions('project', ['updateRecruitmentRoles']),
        addRecruitmentRole() {
            if (this.recruitmentRoles.length < 9 && this.totalCount < 9) {
                this.recruitmentRoles.push({ jobId: 6, count: 1 }); // + 디자인
            }
        },
        removeRecruitmentRole() {
            if (this.recruitmentRoles.length > 1) {
                this.recruitmentRoles.pop();
            }
        },
        incrementCount(index) {
            if (this.totalCount < 9) {
                const newRoles = [...this.recruitmentRoles];
                newRoles[index].count++;
                this.updateRecruitmentRoles(newRoles);
            }
        },
        decrementCount(index) {
            if (this.totalCount > 1 && this.recruitmentRoles[index].count > 1) {
                const newRoles = [...this.recruitmentRoles];
                newRoles[index].count--;
                this.updateRecruitmentRoles(newRoles);
            }
        },
        updateJob(index, jobId) {
            const newRoles = [...this.recruitmentRoles];
            newRoles[index].jobId = jobId;
            this.updateRecruitmentRoles(newRoles);
        },
    },
};
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card-title class="mb-2 title-text">모집 포지션 및 인원</v-card-title>
                <p class="mb-4">❗프로젝트에 참여할 인원수를 정해주세요. (최대 9명)</p>

                <v-row v-for="(recruitment, index) in recruitmentRoles" :key="index" align="center" class="mb-2">
                    <v-col cols="12" md="5" class="d-flex align-center">
                        <v-select
                            v-model="recruitment.jobId"
                            :items="roleOptions"
                            item-text="name"
                            item-value="jobId"
                            outlined
                            dense
                            label="역할 선택"
                            @change="updateJob(index, $event)"
                            :disabled="recruitment.jobId === 1"
                        ></v-select>
                    </v-col>

                    <v-col cols="12" md="7" class="d-flex align-center margin-bottom">
                        <v-btn icon @click="decrementCount(index)" :disabled="recruitment.jobId === 1">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span class="mx-2 red--text">{{ recruitment.count }}</span>
                        <v-btn icon @click="incrementCount(index)" :disabled="recruitment.jobId === 1">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-btn color="grey" outlined @click="removeRecruitmentRole">삭제</v-btn>
                        &nbsp;
                        <v-btn color="primary" outlined @click="addRecruitmentRole">추가</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.title-text {
    font-size: 32px;
    font-weight: bold;
}
.margin-bottom {
    margin-bottom: 26px;
}
</style>
