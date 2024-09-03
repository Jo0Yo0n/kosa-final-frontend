<!--
 * fileName       : ProjectComponent
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
 * 2024-08-29        Yeong-Huns       저장된 기술 스택이면 이미지 보여주기
 * 2024-08-29        Yeong-Huns       DB 에서 knownTech 받아오기(진행중)
 * 2024-08-29        Yeong-Huns       실시간으로 드롭다운으로 knowTech 보여줌
-->
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ProjectTechStack',
    data() {
        return {
            newTech: '',
            showDropdown: false,
        };
    },
    computed: {
        ...mapGetters('project', ['techStack', 'knownTech']),
        filteredTechOptions() {
            const input = this.newTech.trim().toLowerCase();
            let options = [];

            if (input.length >= 2) {
                options = this.knownTech.filter((tech) => tech.name.toLowerCase().includes(input)).map((tech) => tech.name);

                if (input && !options.includes(input)) {
                    options.unshift(input); // 사용자 입력이 knownTech에 없을 때 추가
                }
            }
            return options;
        },
    },
    methods: {
        ...mapActions('project', ['addTech', 'removeTechAction']), // 액션 이름 변경
        isKnownTech(tech) {
            return this.knownTech.some((item) => item.name.toLowerCase() === tech.toLowerCase());
        },
        getTechImage(tech) {
            const techItem = this.knownTech.find((item) => item.name.toLowerCase() === tech.toLowerCase());
            return techItem ? techItem.ImgUrl : '';
        },
        handleInput() {
            const inputLength = this.newTech.trim().length;
            this.showDropdown = inputLength >= 2 && this.filteredTechOptions.length > 0;
        },
        handleFocus() {
            this.showDropdown = this.newTech.trim().length >= 2 && this.filteredTechOptions.length > 0;
        },
        selectTech(tech) {
            this.newTech = tech;
            this.addTechIfValid(tech);
        },
        addTechIfValid(tech) {
            const trimmedTech = tech.trim();
            if (trimmedTech && !this.techStack.find((t) => t.name.toLowerCase() === trimmedTech.toLowerCase())) {
                const techItem = this.knownTech.find((item) => item.name.toLowerCase() === trimmedTech.toLowerCase());
                const techStackId = techItem ? techItem.techStackId : 1; // knownTech에 없으면 ID 1로 설정
                this.addTech({ techStackId, name: trimmedTech });
                this.newTech = '';
            }
            this.showDropdown = false;
        },
        removeTech(index) {
            this.removeTechAction({ index }); // Vuex 액션 이름이 다르게 설정됨
        },
    },
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card-title class="mb-2 title-text">기술 스택</v-card-title>
                <p class="mb-4">❗프로젝트에 적용될/적용할 기술/디자인 플랫폼을 선택해주세요.</p>

                <div class="d-flex align-center flex-wrap">
                    <div v-for="(tech, index) in techStack" :key="index" class="d-flex align-center mb-2">
                        <v-chip v-if="isKnownTech(tech.name)" class="mr-2" close @click:close="removeTech(index)" outlined>
                            <v-avatar left>
                                <img :src="getTechImage(tech.name)" alt="tech image" />
                            </v-avatar>
                            {{ tech.name }}
                        </v-chip>
                        <v-chip v-else class="mr-2" close @click:close="removeTech(index)" outlined>
                            {{ tech.name }}
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
                            @keyup.enter="addTechIfValid(newTech)"
                            class="mb-4"
                            clearable
                            v-bind="attrs"
                            v-on="on"
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
