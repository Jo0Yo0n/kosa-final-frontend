<template>
    <div>
        <h3>Page Not Found</h3>
    </div>
</template>

<script>
export default {
    beforeMount() {
        const path = this.$route.params.path;
        console.log(`라우터에서 받은 params : ${path}`);
    },
};
</script>

<style scoped></style>
