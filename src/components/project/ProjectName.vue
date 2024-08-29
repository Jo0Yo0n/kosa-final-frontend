<!--
 * fileName       : ProjectName
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
-->
<script>
export default {
    name: 'ProjectName',
    data() {
        return {
            rules: {
                required: (value) => !!value || '필수 입력 사항입니다.',
                minLength: (value) => value.length >= 3 || '최소 3글자 이상이어야 합니다.',
                maxLength: (value) => value.length <= 50 || '최대 50글자 이하이어야 합니다.',
            },
        };
    },
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card-title variant="h6" class="mb-2 title-text"> 프로젝트명 </v-card-title>
                <p class="mb-4">❗직관적인 프로젝트명을 사용하시면 클릭율이 올라갑니다.</p>
                <v-text-field
                    label="프로젝트명"
                    placeholder="3-50 글자로 적어주세요"
                    outlined
                    counter="50"
                    :rules="[rules.required, rules.minLength, rules.maxLength]"
                    class="rounded-lg"
                ></v-text-field>
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
