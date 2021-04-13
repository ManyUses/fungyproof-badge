<template>
  <div class="view-main">
    <p class="text-center">
      Connect a wallet to verify ownership of {{ tokenAddress }} ({{ tokenId }}) for "{{ origin }}"
    </p>
    <ConnectBtn />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ConnectBtn from '@/components/ConnectBtn/index.vue'
import { AppModule } from '@/store/modules/app'

@Component({
  name: 'Connect',
  components: {
    ConnectBtn
  }
})
export default class extends Vue {
  get tokenAddress() {
    return AppModule.tokenAddress
  }

  get tokenId() {
    return AppModule.tokenId
  }

  get origin() {
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
