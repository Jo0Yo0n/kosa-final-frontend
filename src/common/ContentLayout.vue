<template>
    <div>
        <router-view></router-view>
        <AdditionalInfoModal v-if="isNewUser" @info-submitted="handleInfoSubmitted" />
    </div>
</template>

<script>
import AdditionalInfoModal from '@/components/login/AdditionalInfoModal.vue';
export default {
    components: { AdditionalInfoModal },
    data() {
        return {
            isNewUser: false, // 새 사용자 여부 확인
        };
    },
    created() {
        // 컴포넌트가 생성될 때 쿼리 파라미터를 확인
        const urlParams = new URLSearchParams(window.location.search);
        this.isNewUser = urlParams.get('newUser') === 'true'; // newUser 쿼리 파라미터 체크
    },
    methods: {
        handleInfoSubmitted() {
            // 정보 제출 후 모달을 닫고 다른 작업 수행 (예: 메인 페이지로 리디렉션)
            this.isNewUser = false; // 모달 닫기
            alert('추가 정보가 성공적으로 저장되었습니다!');
        },
    },
};
</script>

<style scoped></style>
