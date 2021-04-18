<template>
  <div class="view-main">
    <p class="text-center">
      Connect a wallet to verify ownership of {{ contract }} ({{ tokenId }}) for "{{ origin }}"
    </p>
    <ConnectBtn />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import ConnectBtn from '@/components/ConnectBtn/index.vue'
import { AppModule } from '@/store/modules/app'

@Component({
  name: 'Connect',
  components: {
    ConnectBtn
  }
})
export default class extends Vue {
  private get appModule() {
    return getModule(AppModule, this.$store)
  }

  private get contract() {
    return this.appModule.contract
  }

  private get tokenId() {
    return this.appModule.tokenId
  }

  private get origin() {
    return window.location.hostname
  }
}
</script>

<style lang="scss" scoped>
.view-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 240px;
}
</style>
