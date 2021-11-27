import Vue from 'vue'
import Vuelidate from 'vuelidate'
// import VeeValidate from 'vee-validate'
import '@/plugins/axios'
import '@/plugins/vuetify'
import '@/plugins/common'
import '@/plugins/googleAnalytics'
import i18n from '@/plugins/i18n'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'
import vaalid from '@/plugins/vaalidate'
import plumessag from '@/plugins/plumessag'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' // Vuesax styles

Vue.config.productionTip = false

Vue.use(Vuesax)

Vue.use(Vuelidate)
// Vue.use(VeeValidate)
Vue.use(vaalid)
Vue.use(plumessag)

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
