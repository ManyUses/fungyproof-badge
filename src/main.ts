
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'

import App from '@/App.vue'
import i18n from '@/lang'
import vuetify from '@/plugins/vuetify'
import { createStore } from '@/store'
import { certifyNFT } from '@/utils/api'
import { AppModule } from '@/store/modules/app'

(window as any).Web3Modal = require('web3modal')

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
      const contract = this.$el.getAttribute('contract') || ''
      appModule.setToken({ id, contract })

      // check if Address/ID is verified at this origin
      // otherwise trigger message cert requirement
      try {
        const result = await certifyNFT({
          contract,
          tokenId: id
        })

        if (result.code === 200) {
          this.$store.commit('SET_CERT', result.data)
        }
      } catch (err) {
        this.$store.commit('SET_CERT', false)
      }
    },
    render: (h) => h(App)
  }).$mount(nodes[i])
}
