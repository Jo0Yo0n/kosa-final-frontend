<!--
 * fileName       : CommonModal
 * author         : Yeong-Huns
 * date           : 2024-09-02
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-02        Yeong-Huns       최초 생성
-->
<script>
export default {
    name: 'commonModal',
    props: {
        value: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            dialog: this.value,
        };
    },
    watch: {
        value(val) {
            this.dialog = val;
        },
        dialog(val) {
            this.$emit('input', val);
        },
    },
    methods: {
        close() {
            this.dialog = false;
            this.$emit('close');
        },
    },
};
</script>
<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-card class="modal-card">
            <v-card-title class="title">
                <slot name="title">기본 타이틀</slot>
            </v-card-title>

            <v-card-text class="content text-h5">
                <slot name="content">기본 내용</slot>
            </v-card-text>

            <v-card-actions class="modal-actions" v-if="$slots.firstButton || $slots.secondButton">
                <v-spacer></v-spacer>
                <slot name="firstButton"></slot>
                <slot name="secondButton"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.modal-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 230px;
}

.title {
    background-color: #a1887f;
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    padding: 16px;
    text-align: center;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #424242;
    text-align: center;
    padding: 0 16px;
}

.modal-actions {
    padding: 8px 16px;
    justify-content: center;
}

.v-btn {
    margin: 0 8px;
    transition: background-color 0.3s ease; /* 마우스 호버 시 효과 */
}

.v-btn:hover {
    background-color: #e0e0e0; /* 버튼 호버 시 배경색 */
}
</style>
