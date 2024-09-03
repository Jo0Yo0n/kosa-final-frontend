<template>
    <v-container>
        <v-row class="align-center mx-3">
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
                        <v-btn color="brown" dark @click="toggleEditMode" :disabled="!canEditRetrospective">
                            <v-icon left>{{ isEditing ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
                            {{ isEditing ? '저장' : selectedRetrospective ? '수정' : '작성' }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-card v-if="selectedRetrospective || isEditing" class="mt-4">
            <v-card-title>{{ selectedWeek }}주차 회고</v-card-title>
            <v-card-text>
                <template v-if="isEditing">
                    <project-retrospective-editor
                        ref="editor"
                        :initial-content="selectedRetrospective ? selectedRetrospective.content : ''"
                        @save="saveRetrospective"
                        @cancel="cancelEdit"
                    />
                </template>
                <template v-else>
                    <p>작성일: {{ formatDate(selectedRetrospective?.createdAt) }}</p>
                    <div v-html="selectedRetrospective?.content"></div>
                </template>
            </v-card-text>
        </v-card>
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
            retrospectives: [],
            isEditing: false,
        };
    },
    computed: {
        selectedRetrospective() {
            return this.retrospectives.find((r) => r.memberId === this.selectedMember && r.week === this.selectedWeek);
        },
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
        canEditRetrospective() {
            return this.selectedWeek === this.currentWeek && this.isRetrospectiveWeek;
        },
        isRetrospectiveWeek() {
            const { duration, cycle } = this.project;
            return this.currentWeek % cycle === 0 || this.currentWeek === duration;
        },
    },
    created() {
        this.initializeMembers();
        this.fetchRetrospectives();
    },
    methods: {
        initializeMembers() {
            this.members = [this.project.leader, ...this.project.recruitments.flatMap((r) => r.members)];
            this.selectedMember = this.members[0].memberId;
        },
        async fetchRetrospectives() {
            // API call to fetch retrospectives
            // this.retrospectives = await this.$axios.get(`/api/projects/${this.project.projectId}/retrospectives`);
            // 임시 데이터:
            this.retrospectives = [];
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('ko-KR');
        },
        toggleEditMode() {
            if (this.isEditing) {
                this.saveRetrospective();
            } else {
                this.isEditing = true;
            }
        },
        async saveRetrospective() {
            // const content = this.$refs.editor.getEditorContent();
            // API call to save retrospective
            // await this.$axios.post(`/api/projects/${this.project.projectId}/retrospectives`, {
            //     content,
            //     memberId: this.selectedMember,
            //     week: this.selectedWeek
            // });
            await this.fetchRetrospectives();
            this.isEditing = false;
        },
        cancelEdit() {
            this.isEditing = false;
        },
    },
};
</script>
