<!--
 * fileName       : ProjectCycle
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
-->
<script>
export default {
    name: 'ProjectCycle',
    data() {
        return {
            cycleOptions: Array.from({ length: 100 }, (_, i) => i + 1), // 100주가 최대
            selectedCycle: null, // 선택된 기간
        };
    },
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card-title class="mb-2 title-text">회고 주기</v-card-title>
                <p class="mb-4">❗프로젝트 회고를 진행할 주기를 설정해주세요. (단위: 주)</p>
                <v-row>
                    <v-col cols="12" md="5">
                        <v-select
                            v-model="selectedCycle"
                            :items="cycleOptions"
                            label="회고 주기 (단위: 주)"
                            :menu-props="{ maxHeight: '150px', offsetY: true, offsetYValue: 15 }"
                            placeholder="선택 (단위: 주)"
                            outlined
                            dense
                            clearable
                        ></v-select>
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
</style>
