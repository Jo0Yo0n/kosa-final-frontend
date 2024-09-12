<!--
 * fileName       : MemberCardList
 * author         : Heeseon
 * date           : 2024-09-07
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-07        Heeseon       최초 생성
-->
<template>
    <section class="members">
        <div v-if="visibleMembers.length > 0" class="member-list">
            <MemberCard v-for="member in visibleMembers" :key="member.memberId" :member="member" />
        </div>
        <div class="more-button-container">
            <button v-if="visibleMembers.length < members.length" @click="showMoreMembers">더보기</button>
        </div>
    </section>
</template>

<script>
import MemberCard from './MemberCard.vue';

export default {
    name: 'MemberCardList',
    components: {
        MemberCard,
    },
    props: {
        members: {
            type: Array,
            default: () => [], // 빈 배열을 기본값으로 설정
        },
    },
    data() {
        return {
            visibleCount: 4, // 처음에 표시할 라떼버 수
        };
    },
    computed: {
        visibleMembers() {
            // 처음에 visibleCount만큼의 라떼버를 보여줌
            return this.members.slice(0, this.visibleCount);
        },
    },
    methods: {
        showMoreMembers() {
            // 더보기 버튼 클릭 시 추가로 보여줌
            this.visibleCount += 4;
        },
    },
};
</script>
<style scoped>
.member-list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-right: 0 !important;
}
.more-button-container {
    display: flex;
    justify-content: flex-end; /* Aligns the button to the right */
    width: 100%; /* Ensures the button container spans full width */
    margin-top: 20px;
}
button {
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    background-color: white;
    color: #6f4a3d;
    cursor: pointer;
    border-radius: 20px;
}

button:hover {
    background-color: rgba(128, 128, 128, 0.5); /* 투명한 회색 (rgba) */
    color: black; /* 선택적으로 텍스트 색상 변경 */
}
</style>
