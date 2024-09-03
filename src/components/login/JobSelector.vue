<!--
 * fileName       : JobSelector
 * author         : yunbin
 * date           : 2024-09-02
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-02        yunbin       최초 생성
-->
<script>
export default {
    name: 'JobSelector',
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        jobOptions: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {};
    },
    computed: {
        selectedJobs: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit('input', newValue);
            },
        },
    },
};
</script>

<template>
    <div>
        <label class="input-label">
            직무
            <span class="required-asterisk">*</span>
        </label>
        <v-select
            v-model="selectedJobs"
            :items="jobOptions"
            item-text="name"
            item-value="jobId"
            chips
            multiple
            outlined
            :rules="[(v) => !!v.length || '직무를 선택해주세요']"
        ></v-select>
    </div>
</template>

<style scoped>
.input-label {
    color: black;
    font-weight: normal;
}
.required-asterisk {
    color: red;
    margin-left: 4px;
}
</style>
