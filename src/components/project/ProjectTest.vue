<!--
 * fileName       : ProjectTest
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
-->
<script>
import card from '@/components/project/CardCompo.vue';
import editor from '@/components/project/ProjectEditor.vue';
import projectName from '@/components/project/ProjectName.vue';
import projectImage from '@/components/project/ProjectImage.vue';
import projectRecruitment from '@/components/project/ProjectRecruitment.vue';
import projectTechStack from '@/components/project/ProjectTechStack.vue';
import projectDuration from '@/components/project/ProjectDuration.vue';
import projectCycle from '@/components/project/ProjectCycle.vue';
import projectButtonGroup from '@/components/project/ProjectButtonGroup.vue';
export default {
    name: 'ProjectTest',
    components: {
        card,
        editor,
        projectName,
        projectImage,
        projectRecruitment,
        projectTechStack,
        projectDuration,
        projectCycle,
        projectButtonGroup,
    },
};
</script>

<template>
    <div>
        <card></card>
        <projectName></projectName>
        <projectImage></projectImage>
        <projectRecruitment></projectRecruitment>
        <editor></editor>
        <projectTechStack></projectTechStack>
        <projectDuration></projectDuration>
        <projectCycle></projectCycle>
        <projectButtonGroup></projectButtonGroup>
    </div>
</template>

<style scoped></style>
