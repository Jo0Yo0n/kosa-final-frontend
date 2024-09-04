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
        <v-card>
            <v-card-title class="text-h5">
                <slot name="title">기본 타이틀</slot>
            </v-card-title>

            <v-card-text>
                <slot name="content">기본 내용</slot>
            </v-card-text>

            <v-card-actions v-if="$slots.firstButton || $slots.secondButton">
                <v-spacer></v-spacer>
                <slot name="firstButton"> </slot>
                <slot name="secondButton"> </slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped></style>
