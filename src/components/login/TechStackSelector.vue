<!--
 * fileName       : TechStackSelector
 * author         : yunbin
 * date           : 2024-09-01
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-01        yunbin       최초 생성
-->
<script>
export default {
    name: 'TechStackSelector',
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        customStacks: {
            type: Array,
            default: () => [],
        },
        techOptions: {
            type: Object,
            default: () => ({}),
        },
        maxTechStacks: {
            type: Number,
            default: 10, // 기본 최대 기술 스택 수
        },
        minTechStacks: {
            type: Number,
            default: 1, // 최소 기술 스택 수
        },
    },
    data() {
        return {
            newTech: '',
            showDropdown: false,
            errorMessage: '',
        };
    },
    computed: {
        filteredTechOptions() {
            const input = (this.newTech || '').trim().toLowerCase(); // null 또는 undefined일 경우 빈 문자열로 처리
            let options = [];

            if (input.length >= 2) {
                options = Object.keys(this.techOptions).filter((tech) => tech.toLowerCase().includes(input));

                if (!options.includes(input)) {
                    options.unshift(input);
                }
            }
            return options;
        },
        filteredValue() {
            return this.value.filter((techId) => techId !== 1);
        },
    },
    methods: {
        addTech() {
            if (this.value.length < this.maxTechStacks) {
                console.log('addTech', this.value.length);
                this.selectTech(this.newTech);
            } else {
                this.errorMessage = `최대 ${this.maxTechStacks}개의 기술 스택을 추가할 수 있습니다.`;
                console.log(this.errorMessage);
            }
        },
        selectTech(techName) {
            if (this.value.length >= this.maxTechStacks) {
                this.errorMessage = `최대 ${this.maxTechStacks}개의 기술 스택을 추가할 수 있습니다.`;
                return;
            }
            const techNameLower = techName.toLowerCase();
            if (this.techOptions[techNameLower]) {
                const techId = this.techOptions[techNameLower].techStackId;
                if (!this.value.includes(techId)) {
                    this.$emit('input', [...this.value, techId]);
                }
            } else {
                if (!this.customStacks.includes(techNameLower)) {
                    this.$emit('input', [...this.value, 1]); // techStackIds에 1 추가
                    this.$emit('customInput', [...this.customStacks, techNameLower]); // customStacks에 문자열 추가
                }
            }
            this.newTech = '';
            this.showDropdown = false;
            this.errorMessage = '';
            console.log('selectTech', this.value.length);
        },
        removeTech(index, isCustom) {
            if (isCustom) {
                const updatedCustomStacks = [...this.customStacks];
                updatedCustomStacks.splice(index, 1);
                this.$emit('customInput', updatedCustomStacks);

                // techStackIds에서 1을 제거
                const techStackIndex = this.value.indexOf(1);
                if (techStackIndex !== -1) {
                    const updatedStack = [...this.value];
                    updatedStack.splice(techStackIndex, 1);
                    this.$emit('input', updatedStack);
                }
            } else {
                const updatedStack = [...this.value];
                updatedStack.splice(index, 1);
                this.$emit('input', updatedStack);
            }
            this.errorMessage = '';
        },
        isKnownTech(tech) {
            return Object.keys(this.techOptions).includes(tech);
        },
        getTechImage(techName) {
            if (!techName) return ''; // techName이 없으면 빈 문자열 반환

            const tech = this.techOptions[techName.toLowerCase()];
            
            return tech ? tech.ImgUrl : '';
        },
        handleInput() {
            const input = (this.newTech || '').trim().toLowerCase(); // null 체크 후 trim 호출
            const inputLength = input.length;
            this.showDropdown = inputLength >= 2 && this.filteredTechOptions.length > 0;
            this.errorMessage = '';
        },
    },
};
</script>

<template>
    <div>
        <label class="input-label">
            기술 스택
            <span class="required-asterisk">*</span>
        </label>
        <div class="d-flex align-center flex-wrap">
            <div v-for="(techId, index) in filteredValue" :key="`known-${index}`" class="d-flex align-center mb-2">
                <v-chip class="mr-2" close @click:close="removeTech(index, false)" outlined>
                    <v-avatar left v-if="getTechImage(Object.keys(techOptions).find((key) => techOptions[key].techStackId === techId))">
                        <img :src="getTechImage(Object.keys(techOptions).find((key) => techOptions[key].techStackId === techId))" alt="tech image" />
                    </v-avatar>
                    {{ Object.keys(techOptions).find((key) => techOptions[key].techStackId === techId) }}
                </v-chip>
            </div>
            <div v-for="(tech, index) in customStacks" :key="`custom-${index}`" class="d-flex align-center mb-2">
                <v-chip class="mr-2" close @click:close="removeTech(index, true)" outlined>
                    {{ tech }}
                </v-chip>
            </div>
        </div>

        <v-menu v-show="showDropdown" v-model="showDropdown" offset-y :open-on-focus="false">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="newTech"
                    placeholder="예) figma, react, java, node, spring"
                    outlined
                    dense
                    @input="handleInput"
                    @keyup.enter="addTech()"
                    class="mb-4"
                    clearable
                    v-bind="attrs"
                    v-on="on"
                    :rules="[() => value.length >= minTechStacks || `${minTechStacks}개 이상의 기술 스택을 선택해주세요.`]"
                    :error-messages="errorMessage"
                ></v-text-field>
            </template>

            <v-list>
                <v-list-item v-for="(tech, index) in filteredTechOptions" :key="index">
                    <v-list-item-content @click.stop="selectTech(tech)">
                        <v-list-item-title>{{ tech }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<style scoped>
.d-flex {
    display: flex;
}
.align-center {
    align-items: center;
}
.flex-wrap {
    flex-wrap: wrap;
}
.mb-2 {
    margin-bottom: 8px;
}
.mr-2 {
    margin-right: 8px;
}
.mb-4 {
    margin-bottom: 16px;
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
