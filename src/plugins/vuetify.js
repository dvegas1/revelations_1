import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'
import VuetifyConfirm from 'vuetify-confirm'
import '@mdi/font/css/materialdesignicons.css'
import './../app/css/index.css'

Vue.use(Vuetify, {
  theme: {
    primary: colors.green.darken1,
    secondary: colors.shades.black,
    error: colors.orange.darken3
  },
  iconfont: 'mdi'
})
Vue.use(VuetifyConfirm)
