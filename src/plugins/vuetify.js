import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import zhHant from 'vuetify/es5/locale/zh-Hant'

Vue.use(Vuetify, {
  theme: {
    primary: '#C62828',
    secondary: '#424242',
    accent: '#D50000',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  iconfont: 'md',
  lang: {
    locales: {
      zhHant
    },
    current: 'zh-Hant'
  }
})
