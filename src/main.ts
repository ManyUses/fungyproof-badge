import Vue from 'vue'
import App from '@/App.vue'
import i18n from '@/lang'
import vuetify from '@/plugins/vuetify'
import store from '@/store'

import { certifyNFT } from '@/utils/api'

import '@/pwa/register-service-worker'

Vue.config.productionTip = false

new Vue({
  i18n,
  vuetify,
  store,
  async beforeMount() {
    const id = this.$el.getAttribute('data-token') || ''
    const address = this.$el.getAttribute('data-contract') || ''
    this.$store.dispatch('setToken', { id, address })

    // check if Address/ID is verified at this origin
    // otherwise trigger message signature requirement
    const result = await certifyNFT({
      contract: address,
      tokenId: id
    })

    if (result.code === 200) {
      this.$store.dispatch('setVerified', true)
    }
  },
  render: (h) => h(App)
}).$mount('#app')
