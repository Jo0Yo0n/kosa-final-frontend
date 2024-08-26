const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  devServer: {
    proxy: 'https://hesil.site',
    port: 3000
  }
})
