<template>
  <div class="view-token pa-4">
    <v-img
      v-if="image"
      :src="image"
      max-width="240"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { AuthModule } from '@/store/modules/auth'
import { AppModule } from '@/store/modules/app'
import { getChain } from '@fungyproof/eth-nft'
import { gradeNFT } from '@/utils/api'

@Component({
  name: 'Token',
  components: {}
})
export default class extends Vue {
  private image = null
  private get appModule() {
    return getModule(AppModule, this.$store)
  }

  private get authModule() {
    return getModule(AuthModule, this.$store)
  }

  private get chainId() {
    return (this.authModule.provider as any)?.chainId
  }

  private get chain() {
    return getChain(this.chainId)
  }

  private async mounted() {
    const cert: any = this.authModule.cert
    if (cert) {
      const { data } = await gradeNFT({
        address: this.appModule.contract,
        id: this.appModule.tokenId
      }, cert.networkId)
      this.image = data?.data?.image?.url
    }
  }
}
</script>

<style lang="scss" scoped>
.view-token {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 240px;
}
</style>
