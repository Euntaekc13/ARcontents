import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import loadScript from 'vue-plugin-load-script';
// Vue.use(loadScript);


new Vue({
  loadScript,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
