<!--
 * fileName       : TextInputField
 * author         : yunbin
 * date           : 2024-08-28
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-28        yunbin       최초 생성
-->
<script>
export default {
    name: 'TextInputField',
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            required: true,
        },
        rules: {
            type: Array,
            default: () => [],
        },
        outlined: {
            type: Boolean,
            default: true,
        },
        dense: {
            type: Boolean,
            default: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        nicknameStatus: {
            type: Boolean,
            default: null,
        },
    },
    computed: {
        inputValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
    },
    methods: {
        validate() {
            // 내부 v-text-field의 validate 메서드를 호출
            return this.$refs.input.validate();
        },
    },
};
</script>

<template>
    <div class="my-4">
        <label :for="id" class="input-label">
            {{ label }}
            <span v-if="required" class="required-asterisk">*</span>
        </label>
        <v-text-field
            :id="id"
            ref="input"
            v-model="inputValue"
            :rules="rules"
            :outlined="outlined"
            :dense="dense"
            :required="required"
            :placeholder="placeholder"
            v-on="$listeners"
            :key="nicknameStatus"
        ></v-text-field>
    </div>
</template>

<style scoped>
.my-4 {
    margin: 1rem 0;
}

.input-label {
    color: black;
    font-weight: normal;
}

.required-asterisk {
    color: red;
    margin-left: 4px;
}
</style>
