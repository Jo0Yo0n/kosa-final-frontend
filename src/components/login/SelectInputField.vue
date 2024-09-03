<!--
 * fileName       : SelectInputField
 * author         : yunbin
 * date           : 2024-08-28
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-28        yunbin       최초 생성
-->
<script>
export default {
    name: 'SelectInputField',
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: [Number, Array, String], // String 타입도 추가
            default: () => (this.isMultiple ? [] : ''), // 다중 선택일 경우 빈 배열, 단일 선택일 경우 빈 문자열
        },
        items: {
            type: Array,
            required: true,
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
            default: '선택',
        },
        isMultiple: {
            // 다중 선택 여부
            type: Boolean,
            default: false,
        },
    },
    computed: {
        inputValue: {
            get() {
                return this.value;
            },
            set(val) {
                if (this.isMultiple) {
                    if (!Array.isArray(val)) {
                        this.$emit('input', [val]); // 단일 값을 배열로
                    } else {
                        this.$emit('input', val); // 이미 배열인 경우
                    }
                } else {
                    this.$emit('input', val); // 다중 선택이 아닌 경우
                }
            },
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
        <v-select
            :id="id"
            v-model="inputValue"
            :rules="rules"
            :items="items"
            :outlined="outlined"
            :dense="dense"
            :required="required"
            :placeholder="placeholder"
            :multiple="isMultiple"
        ></v-select>
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
    margin-left: 4px; /* 간격을 조금 띄워줍니다 */
}
</style>
