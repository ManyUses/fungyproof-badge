
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'

import App from '@/App.vue'
import i18n from '@/lang'
import vuetify from '@/plugins/vuetify'
import { createStore } from '@/store'
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
    },
    render: (h) => h(App)
  }).$mount(nodes[i])
}
