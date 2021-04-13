<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Account />
    <v-tabs v-if="address" right>
      <v-tab @click="view = 'Token'" :ripple="false">
        Token
      </v-tab>
      <v-tab @click="view = 'Grade'" :ripple="false">
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
import ResizeMixin from '@/views/mixin/resize'
import Account from '@/components/Account/index.vue'
import Connect from '@/views/Connect/index.vue'
import Token from '@/views/Token/index.vue'
import Grade from '@/views/Grade/index.vue'

@Component({
  name: 'Views',
  components: {
    Account,
    Connect,
    Token,
    Grade
  }
})
export default class extends mixins(ResizeMixin) {
  private view = 'Connect'

  get classObj() {
    return {
      // hideSidebar: !this.sidebar.opened,
      // openSidebar: this.sidebar.opened,
      mobile: this.device === DeviceType.Mobile
    }
  }

  private get theme() {
    return (this as any).$vuetify.theme.dark ? 'dark' : 'light'
  }

  private get address() {
    return AuthModule.address
  }

  @Watch('address')
  private watchAddr() {
    if (this.address) {
      this.view = 'Token'
    } else {
      this.view = 'Connect'
    }
  }

  // private handleClickOutside() {
  //   AppModule.CloseSideBar()
  // }
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
