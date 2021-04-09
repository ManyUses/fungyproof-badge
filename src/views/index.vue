<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Account />
    <Main />
  </v-app>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { DeviceType } from '@/store/modules/app'
import Account from '@/components/Account/index.vue'
import Main from '@/views/Main/index.vue'
import ResizeMixin from '@/views/mixin/resize'
import { AuthModule } from '@/store/modules/auth'

@Component({
  name: 'Views',
  components: {
    Account,
    Main
  }
})
export default class extends mixins(ResizeMixin) {
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

  // private handleClickOutside() {
  //   AppModule.CloseSideBar()
  // }
}
</script>
<style scoped></style>
