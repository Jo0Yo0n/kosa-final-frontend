<!--
 * fileName       : ProjectCard
 * author         : Heeseon
 * date           : 2024-09-02
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-09-02        Heeseon       최초 생성
-->
<template>
  <v-card class="ma-2" outlined rounded="lg" style="width: 300px">
    <v-img :src="project.imgUrl" height="150px" class="rounded-lg"></v-img>
    <v-card-text class="pa-3">
      <div class="d-flex flex-column justify-center align-center mb-3">
        <span class="text-h5 font-weight-bold black--text">{{ project.name }}</span>
        <span class="subtitle-1 grey--text">{{ project.duration }}</span>
      </div>
      <div class="d-flex justify-center mb-3">
        <v-icon v-for="icon in techStack" :key="icon" color="green" small class="mx-1">
          {{ icon }}
        </v-icon>
        <div class="d-flex justify-center mb-3">
          <v-icon v-for="icon in techStack" :key="icon" color="green" small class="mx-1">
            {{ icon }}
          </v-icon>
        </div>
        <div class="d-flex justify-space-between">
          <v-chip color="primary" class="font-weight-light">
            <v-icon left>mdi-heart</v-icon>{{ ikes }}
          </v-chip>
          <v-chip color="secondary" class="font-weight-light">
            <v-icon left>mdi-account-group</v-icon>{{ participants }} / {{ maxParticipants }}
          </v-chip>
        </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "ProjectCard",
  props: {
    project: {
      type: Object,
      required: true
    },
  },
};
</script>
<style scoped>
.v-card {
  border-radius: 12px;
}
</style>