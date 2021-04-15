<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Account />
    <v-tabs
      v-if="verified"
      right
    >
      <v-tab
        :ripple="false"
        @click="view = 'Token'"
      >
        Token
      </v-tab>
      <v-tab
        :ripple="false"
        @click="view = 'Grade'"
      >
        Grade
      </v-tab>
    </v-tabs>
    <v-component :is="view" />
  </v-app>
</template>
<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
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

  private get classObj() {
    return {
      mobile: this.device === DeviceType.Mobile
    }
  }

  private get theme() {
    return (this as any).$vuetify.theme.dark ? 'dark' : 'light'
  }

  private get address() {
    return AuthModule.address
  }

  private get verified() {
    return AuthModule.verified
  }

  public mounted() {
    this.setView()
  }

  @Watch('address')
  private watchAddress() {
    this.setView()
  }

  @Watch('verified')
  private watchVerified() {
    this.setView()
  }

  private setView() {
    this.view = (this.verified ? 'Token' : (this.address ? 'Verify' : 'Connect'))
  }
}
</script>
<style scoped>
.theme--light.v-tabs .v-tab--active:focus::before,
.theme--light.v-tabs .v-tab--active:hover::before,
.theme--light.v-tabs .v-tab--active::before,
.theme--light.v-tabs .v-tab:hover::before {
   opacity: 0;
}
</style>
