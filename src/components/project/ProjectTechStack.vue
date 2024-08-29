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
export default {
    name: 'ProjectTechStack',
    data() {
        return {
            newTech: '',
            techStack: [],
            showDropdown: false,
            knownTech: {
                //s3 이미지 링크로 수정필요
                java: 'https://blog.kakaocdn.net/dn/cbm6vp/btsCxbEaIT9/lXmy9TrYxBvBTn6WpWK8D1/img.png',
                javascript: 'https://blog.kakaocdn.net/dn/1MiXF/btrorPnmFyK/S6JElp78z6bMNh3LBSd4j0/img.png',
                python: 'https://i0.wp.com/junilearning.com/wp-content/uploads/2020/06/python-programming-language.webp?fit=1920%2C1920&ssl=1',
            },
        };
    },
    computed: {
        filteredTechOptions() {
            const input = this.newTech.trim().toLowerCase();
            let options = [];

            if (input.length >= 2) {
                options = Object.keys(this.knownTech).filter((tech) => tech.toLowerCase().includes(input));

                if (!options.includes(input)) {
                    options.unshift(input);
                }
            }
            return options;
        },
    },
    methods: {
        addTech() {
            const techName = this.newTech.trim().toLowerCase();
            if (techName && !this.techStack.includes(techName)) {
                this.techStack.push(techName);
                this.newTech = '';
            }
            this.showDropdown = false;
        },
        removeTech(index) {
            this.techStack.splice(index, 1);
        },
        isKnownTech(tech) {
            return Object.keys(this.knownTech).includes(tech);
        },
        getTechImage(tech) {
            return this.knownTech[tech];
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
            this.addTech();
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
                        <v-chip v-if="isKnownTech(tech)" class="mr-2" close @click:close="removeTech(index)" outlined>
                            <v-avatar left>
                                <img :src="getTechImage(tech)" alt="tech image" />
                            </v-avatar>
                            {{ tech }}
                        </v-chip>
                        <v-chip v-else class="mr-2" close @click:close="removeTech(index)" outlined>
                            {{ tech }}
                        </v-chip>
                    </div>
                </div>

                <v-menu v-show="showDropdown" v-model="showDropdown" offset-y open-on-focus="false">
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
