<!--
 * fileName       : ProjectButtonGroup
 * author         : Yeong-Huns
 * date           : 2024-08-29
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-29        Yeong-Huns       최초 생성
-->
<script>
import { mapActions } from 'vuex';

export default {
    name: 'ProjectButtonGroup',
    methods: {
        ...mapActions(['project/cancelAction', 'project/submitAction', 'project/tempAction']),
    },
};
</script>

<template>
    <v-container>
        <v-row justify="center" class="mt-4">
            <v-btn class="coffee-btn" color="#49454f" @click="cancelAction" outlined> 취소 </v-btn>

            <v-btn color="#49454f" @click="completeAction" outlined> 작성완료 </v-btn>

            <v-btn class="coffee-btn" color="#49454f" @click="saveDraftAction" outlined> 임시저장 </v-btn>
        </v-row>
    </v-container>
</template>

<style scoped>
.v-btn {
    margin: 0 10px;
}
.coffee-btn {
    background-color: #efebe9;
}
</style>
