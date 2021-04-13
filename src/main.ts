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
  beforeMount() {
    const id = this.$el.getAttribute('data-token') || ''
    const address = this.$el.getAttribute('data-contract') || ''

    // TODO check if Address/ID is verified at this origin
    // otherwise trigger message signature requirement
    const verified = false
    this.$store.dispatch('SetToken', { id, address, verified })
  },
  render: (h) => h(App)
}).$mount('#app')
