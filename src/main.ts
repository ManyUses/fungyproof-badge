import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import App from '@/App.vue'
import i18n from '@/lang'
import vuetify from '@/plugins/vuetify'
import { createStore } from '@/store'
import { certifyNFT } from '@/utils/api'
import { AppModule } from '@/store/modules/app'

import '@/pwa/register-service-worker'

Vue.config.productionTip = false

const nodes = document.querySelectorAll('fungy-proof-badge')
for (let i = 0; i < nodes.length; ++i) {
  const store = createStore()
  new Vue({
    i18n,
    vuetify,
    store,
    async beforeMount() {
      const appModule = getModule(AppModule, this.$store)
      const id = this.$el.getAttribute('token-id') || ''
      const address = this.$el.getAttribute('contract') || ''
      console.log(id, address)
      appModule.setToken({ id, address })

      // check if Address/ID is verified at this origin
      // otherwise trigger message signature requirement
      try {
        const result = await certifyNFT({
          contract: address,
          tokenId: id
        })

        if (result.code === 200) {
          this.$store.dispatch('setVerified', true)
        }
      } catch (err) {
        this.$store.dispatch('setVerified', false)
      }
    },
    render: (h) => h(App)
  }).$mount(nodes[i])
}
