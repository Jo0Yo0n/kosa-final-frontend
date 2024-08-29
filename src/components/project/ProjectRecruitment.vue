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
export default {
    name: 'ProjectRecruitment',
    data() {
        return {
            roleOptions: ['디자인', '기획', '프론트엔드 개발', '백엔드 개발'],
            roles: [
                { name: '기획', count: 1 },
                { name: '프론트엔드 개발', count: 1 },
                { name: '백엔드 개발', count: 1 },
            ],
        };
    },
    computed: {
        totalCount() {
            // 총합 계산
            return this.roles.reduce((total, role) => total + role.count, 0);
        },
    },
    methods: {
        addRole() {
            if (this.roles.length < 9 && this.totalCount < 9) {
                this.roles.push({ name: '디자인', count: 1 });
            }
        },
        removeRole() {
            if (this.roles.length > 1) {
                this.roles.pop();
            }
        },
        incrementCount(index) {
            // 수량 증가 시 총합 체크
            if (this.totalCount < 9) {
                this.roles[index].count++;
            }
        },
        decrementCount(index) {
            if (this.roles[index].count > 1) {
                this.roles[index].count--;
            }
        },
    },
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card-title class="mb-2 title-text">모집 인원</v-card-title>
                <p class="mb-4">❗프로젝트에 참여할 인원수를 정해주세요. (최대 9명)</p>

                <v-row v-for="(role, index) in roles" :key="index" align="center" class="mb-2">
                    <v-col cols="12" md="5" class="d-flex align-center">
                        <v-select v-model="role.name" :items="roleOptions" outlined dense label="역할 선택"></v-select>
                    </v-col>

                    <v-col cols="12" md="7" class="d-flex align-center margin-bottom">
                        <v-btn icon @click="decrementCount(index)">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span class="mx-2 red--text">{{ role.count }}</span>
                        <v-btn icon @click="incrementCount(index)">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-btn color="grey" outlined @click="removeRole">삭제</v-btn>
                        &nbsp;
                        <v-btn color="primary" outlined @click="addRole">추가</v-btn>
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
