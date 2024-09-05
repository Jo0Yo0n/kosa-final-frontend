<!--
 * fileName       : ProjectRetrospective
 * author         : JooYoon
 * date           : 2024-09-03
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-03        JooYoon       최초 생성
-->

<template>
    <v-container>
        <v-row class="align-center mx-1">
            <v-col cols="12" sm="4">
                <h2 class="mb-0">프로젝트 회고</h2>
            </v-col>
            <v-col cols="12" sm="8">
                <v-row class="justify-end align-center">
                    <v-col cols="3">
                        <v-select v-model="selectedMember" :items="members" label="멤버" item-text="memberNickname" item-value="memberId" dense hide-details></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select v-model="selectedWeek" :items="retrospectiveWeeks" label="주차" dense hide-details></v-select>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn v-if="selectedWeek" color="brown" dark @click="toggleEditMode">
                            <v-icon left>{{ isEditing ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
                            {{ isEditing ? '저장' : selectedRetrospective ? '수정' : '작성' }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-divider class="ma-6" />

        <div v-if="currentRetrospective || isEditing" class="mt-4">
            <div>
                <template v-if="isEditing">
                    <v-card-title variant="h6" class="mb-2 title-text"> {{ selectedWeek }}주차 회고</v-card-title>
                    <v-text-field
                        label="회고 제목"
                        v-model="title"
                        placeholder="3-50 글자로 적어주세요"
                        outlined
                        counter="50"
                        :rules="[rules.required, rules.minLength, rules.maxLength]"
                        class="rounded-lg"
                    ></v-text-field>
                    <project-retrospective-editor ref="editor" :initial-content="currentRetrospective ? currentRetrospective.content : ''" />
                </template>
                <template v-else-if="currentRetrospective">
                    <p>작성일: {{ formatDate(currentRetrospective?.createdAt) }}</p>
                    <p v-if="currentRetrospective.updatedAt">수정일: {{ formatDate(currentRetrospective.updatedAt) }}</p>
                    <h2 class="mb-5">{{ currentRetrospective?.title }}</h2>
                    <div v-html="currentRetrospective?.content"></div>
                </template>
            </div>
        </div>
    </v-container>
</template>

<script>
import ProjectRetrospectiveEditor from './ProjectRetrospectiveEditor.vue';

export default {
    name: 'ProjectRetrospective',
    components: {
        ProjectRetrospectiveEditor,
    },
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            members: [],
            selectedMember: null,
            selectedWeek: null,
            currentRetrospective: [],
            isEditing: false,
            title: '',
            rules: {
                required: (value) => !!value || '필수 입력 사항입니다.',
                minLength: (value) => value.length >= 3 || '최소 3글자 이상이어야 합니다.',
                maxLength: (value) => value.length <= 50 || '최대 50글자 이하이어야 합니다.',
            },
        };
    },
    computed: {
        currentWeek() {
            const startDate = new Date(this.project.startedAt);
            const today = new Date();
            const diffTime = Math.abs(today - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return Math.ceil(diffDays / 7);
        },
        retrospectiveWeeks() {
            const { duration, cycle } = this.project;
            const weeks = [];
            for (let i = cycle; i <= duration; i += cycle) {
                if (i <= this.currentWeek) {
                    weeks.push(i);
                }
            }
            if (duration % cycle !== 0 && this.currentWeek === duration) {
                weeks.push(duration);
            }
            return weeks;
        },
    },
    watch: {
        selectedMember() {
            this.fetchRetrospectives();
            this.isEditing = false;
            this.title = '';
        },
        selectedWeek() {
            this.fetchRetrospectives();
            this.isEditing = false;
            this.title = '';
        },
    },
    created() {
        this.initializeMembers();
    },
    methods: {
        initializeMembers() {
            this.members = [this.project.leader, ...this.project.recruitments.flatMap((r) => r.members)];
            this.selectedMember = this.members[0].memberId;
        },
        async fetchRetrospectives() {
            if (this.selectedMember && this.selectedWeek) {
                try {
                    const response = await this.$axios.get(`/api/projects/${this.project.projectId}/retrospectives`, {
                        params: {
                            memberId: this.selectedMember,
                            week: this.selectedWeek,
                        },
                    });
                    this.currentRetrospective = response.data;
                } catch (error) {
                    console.error('Error fetching retrospective: ', error);
                    this.currentRetrospective = null;
                }
            } else {
                this.currentRetrospective = null;
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        },
        toggleEditMode() {
            if (this.isEditing) {
                this.saveRetrospective();
            } else {
                this.isEditing = true;
                if (this.currentRetrospective) {
                    this.title = this.currentRetrospective.title;
                }
            }
        },
        async saveRetrospective() {
            try {
                const content = this.$refs.editor.getEditorContent();
                const payload = {
                    title: this.title,
                    content: content,
                };

                if (this.currentRetrospective) {
                    await this.$axios.put(`/api/projects/${this.project.projectId}/retrospectives/${this.currentRetrospective.retrospectiveId}`, payload, {
                        withCredentials: true,
                    });
                } else {
                    await this.$axios.post(
                        `api/projects/${this.project.projectId}/retrospectives`,
                        {
                            week: this.selectedWeek,
                            ...payload,
                        },
                        { withCredentials: true },
                    );
                }
                await this.fetchRetrospectives();
                this.isEditing = false;
            } catch (error) {
                console.error('Error saving retrospective: ', error);
            }
        },
    },
};
</script>
