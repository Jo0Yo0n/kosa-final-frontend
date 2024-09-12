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
                target: `${process.env.VUE_APP_API_URL}`,
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
            '^/node-api': {
                target: `${process.env.VUE_APP_NODE_API_URL}`,
                changeOrigin: true,
                pathRewrite: { '^/node-api': '' },
            },
        },
    },
    prodServer: {
        proxy: {
            // '/api' 로 시작하는 모든 요청을 target url 로 프록시
            '^/api': {
                target: `${process.env.VUE_APP_API_URL}`,
                changeOrigin: true,
            },
            '^/node-api': {
                target: `${process.env.VUE_APP_NODE_API_URL}`,
                changeOrigin: true,
            },
        },
    },
});
