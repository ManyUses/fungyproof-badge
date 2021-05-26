<template>
  <v-app :style="{background: 'transparent'}">
    <Account />
    <v-card
      v-if="view"
      outlined
      :loading="loading"
    >
      <v-fade-transition
        mode="out-in"
      >
        <v-component
          :is="view"
          @change="onChange"
        />
      </v-fade-transition>
    </v-card>
  </v-app>
</template>
<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { mixins } from 'vue-class-component'
import { certifyNFT } from '@/utils/api'
import { AppModule, DeviceType } from '@/store/modules/app'
import { AuthModule } from '@/store/modules/auth'
import ResizeMixin from '@/mixins/resize'
import Account from '@/components/Account/index.vue'
import Loading from '@/views/Loading/index.vue'
import Verify from '@/views/Verify/index.vue'
import Token from '@/views/Token/index.vue'
import Grade from '@/views/Grade/index.vue'

@Component({
  name: 'Views',
  components: {
    Loading,
    Account,
    Verify,
    Token,
    Grade
  }
})
export default class extends mixins(ResizeMixin) {
  private loading = false

  public get authModule() {
    return getModule(AuthModule, this.$store)
  }

  private get appMod() {
    return getModule(AppModule, this.$store)
  }

  private get classObj() {
    return {
      mobile: this.device === DeviceType.Mobile
    }
  }

  private get view() {
    return this.appMod.view
  }

  private get theme() {
    return (this as any).$vuetify.theme.dark ? 'dark' : 'light'
  }

  private get contract() {
    return this.appMod.contract
  }

  private get tokenId() {
    return this.appMod.tokenId
  }

  private get address() {
    return this.authModule.address
  }

  private get cert() {
    return this.authModule.cert
  }

  public async mounted() {
    try {
      const result = await certifyNFT({
        contract: this.contract,
        tokenId: this.tokenId
      })

      if (result.code === 200) {
        this.$store.commit('SET_CERT', result.data)
      }
    } catch (err) {
      this.$store.commit('SET_CERT', false)
    }
    this.appMod.setView('Token')
  }

  private onChange(view: string) {
    this.appMod.setView(view)
  }
}
</script>
<style scoped>
.v-application {
  width: 320px;
}
</style>
