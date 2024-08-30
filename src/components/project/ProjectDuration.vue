<!--
 * fileName       : ProjectDuration
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
-->
<script>
export default {
    name: 'ProjectDuration',
    data() {
        return {
            durationOptions: Array.from({ length: 100 }, (_, i) => i + 1),
            selectedDuration: null, // 선택된 기간
        };
    },
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card-title class="mb-2 title-text">프로젝트 진행 기간</v-card-title>
                <p class="mb-4">❗프로젝트를 진행할 기간을 선택해주세요. (단위: 주)</p>
                <v-row>
                    <v-col cols="12" md="5">
                        <v-select
                            v-model="selectedDuration"
                            :items="durationOptions"
                            label="진행 기간 (단위: 주)"
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
