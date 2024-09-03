<!--
 * fileName       : SocialLoginButton
 * author         : yunbin
 * date           : 2024-08-26
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-08-26        yunbin       최초 생성
-->
<template>
    <div class="button-wrapper">
        <v-btn :color="color" @click="handleClick" class="button">
            <v-img :src="iconSrc" max-width="18" class="logo" />
            <span>{{ text }}</span>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'SocialLoginButton',
    props: {
        color: {
            type: String,
            default: 'primary',
        },
        iconSrc: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        loginUrl: {
            type: String,
            required: true,
        },
    },
    methods: {
        handleClick() {
            window.location.href = this.loginUrl;
        },
    },
};
</script>

<style scoped>
.button-wrapper {
    display: flex;
    justify-content: center;
}

.button {
    display: flex;
    align-items: center;
    padding: 0 8px;
    width: 300px;
    position: relative;
}

.logo {
    margin-right: 24px;
    position: absolute;
    top: 2px;
    left: 2px;
}
</style>
