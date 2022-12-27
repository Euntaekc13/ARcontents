const { defineConfig } = require('@vue/cli-service')
const { VUE_APP_SERVER } = process.env

module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  lintOnSave:false,
  devServer: {
    https: true,
    https: {
      key: fs.readFileSync('C:/Users/User/key/domain.com.key'),
      cert: fs.readFileSync('C:/Users/User/key/domain.com.crt'),
      ca: fs.readFileSync('C:/Users/User/key/rootca.crt'),
    },
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
