import Vue from 'vue'
import '@/plugins/axios'
import '@/plugins/vuetify'
import Vuelidate from 'vuelidate'
import VeeValidate from 'vee-validate'
import '@/plugins/common'
import '@/plugins/googleAnalytics'
import i18n from '@/plugins/i18n'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VeeValidate)

const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    store.dispatch('setLocale', store.getters.locale)
    if (store.getters.isTokenSet) {
      store.dispatch('autoLogin')
    }
  }
}).$mount('#app')

if (window.Cypress) {
  // Only available during E2E tests
  window.app = app
}