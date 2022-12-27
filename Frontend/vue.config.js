const { defineConfig } = require('@vue/cli-service')
const { VUE_APP_SERVER } = process.env

module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  lintOnSave:false,
  devServer: {
    https: true,
    proxy: {
      '/serverApi': {
        target: VUE_APP_SERVER,
        changeOrigin: true,
        pathRewrite: {
          '^/serverApi': ''
        }
      }
    }
  }
})
