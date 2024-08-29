const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: ['vuetify'],
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/scss/variables.scss"`,
            },
            scss: {
                additionalData: `@import "@/scss/variables.scss";`,
            },
        },
    },
    devServer: {
        proxy: {
            // '/api' 로 시작하는 모든 요청을 target url 로 프록시
            '^/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
});
