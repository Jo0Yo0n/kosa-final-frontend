<!--
 * fileName       : ProjectImage
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
-->
<script>
export default {
    name: 'ProjectImage',
    data() {
        return {
            image: null,
        };
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        onFileChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.image = URL.createObjectURL(file); // 이미지 미리보기
            }
        },
    },
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card-title class="mb-2 title-text">대표 이미지</v-card-title>
                <p class="mb-4">❗프로젝트를 대표하는 이미지를 업로드 해주세요.</p>

                <v-row align="center" justify="center">
                    <v-col cols="12" md="4">
                        <v-img v-if="image" :src="image" class="mb-2" contain height="200px"></v-img>
                        <v-responsive v-else aspect-ratio="3" class="img-placeholder rounded-lg">
                            <v-icon large>mdi-camera</v-icon>
                        </v-responsive>
                    </v-col>

                    <v-col cols="12" md="8" class="btn-section">
                        <v-btn @click="triggerFileInput" outlined>이미지 업로드</v-btn>
                        <p class="mt-4 grey--text">💡 가로/세로의 비율이 3:2 일 때 썸네일이 가장 예쁩니다.</p>
                        <p class="grey--text">💡 저작권에 위배되지 않는 파일만 업로드 해주세요.</p>
                        <input ref="fileInput" type="file" accept="image/*" @change="onFileChange" hidden />
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
.img-placeholder {
    border: 1px solid #ddd;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #f5f5f5;
}
.btn-section {
    margin-top: 100px;
}
</style>
