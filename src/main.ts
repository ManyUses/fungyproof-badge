import Vue from 'vue'
import App from '@/App.vue'
import i18n from '@/lang'
import vuetify from '@/plugins/vuetify'
import store from '@/store'

import '@/pwa/register-service-worker'

Vue.config.productionTip = false

new Vue({
  i18n,
  vuetify,
  store,
  render: (h) => h(App)
}).$mount('#app')
