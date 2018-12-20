import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store/'
import './api/'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
