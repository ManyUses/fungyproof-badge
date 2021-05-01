<template>
  <v-app :style="{background: 'transparent'}">
    <Account />
    <v-card outlined>
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
import { DeviceType } from '@/store/modules/app'
import { AuthModule } from '@/store/modules/auth'
import ResizeMixin from '@/mixins/resize'
import Account from '@/components/Account/index.vue'
import Connect from '@/views/Connect/index.vue'
import Verify from '@/views/Verify/index.vue'
import Token from '@/views/Token/index.vue'
import Grade from '@/views/Grade/index.vue'

@Component({
  name: 'Views',
  components: {
    Account,
    Connect,
    Verify,
    Token,
    Grade
  }
})
export default class extends mixins(ResizeMixin) {
  private view = 'Token'

  private get authModule() {
    return getModule(AuthModule, this.$store)
  }

  private get classObj() {
    return {
      mobile: this.device === DeviceType.Mobile
    }
  }

  private get theme() {
    return (this as any).$vuetify.theme.dark ? 'dark' : 'light'
  }

  private get address() {
    return this.authModule.address
  }

  private get cert() {
    return this.authModule.cert
  }

  public mounted() {
    this.setView()
  }

  @Watch('address')
  private watchAddress() {
    this.setView()
  }

  @Watch('cert')
  private watchCert() {
    this.setView()
  }

  private setView() {
    this.view = (this.cert ? 'Token' : (this.address ? 'Verify' : 'Connect'))
  }

  private onChange(view: string) {
    this.view = view
  }
}
</script>
<style scoped>
.v-application {
  width: 320px;
}
</style>
