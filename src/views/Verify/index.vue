<template>
  <div class="view-main">
    <p class="text-center">
      Verify ownership of {{ contract }} ({{ tokenId }}) for "{{ origin }}"
    </p>
    <v-btn
      color="primary"
      @click="verify"
    >
      Verify
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { getChain } from '@fungyproof/eth-nft'
import { AppModule } from '@/store/modules/app'
import { AuthModule } from '@/store/modules/auth'
import { certifyNFT } from '@/utils/api'

@Component({
  name: 'Verify',
  components: {}
})
export default class extends Vue {
  private get authModule() {
    return getModule(AuthModule, this.$store)
  }

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

  private get provider() {
    return this.authModule.provider
  }

  private get address() {
    return this.authModule.address
  }

  private get chainId() {
    return (this.authModule.provider as any)?.chainId
  }

  private get chain() {
    return getChain(this.chainId)
  }

  private async verify() {
    try {
      const result = await certifyNFT(
        {
          contract: this.contract,
          tokenId: this.tokenId
        },
        this.address,
        this.provider,
        this.chain.networkId
      )

      if (result.code === 200) {
        this.authModule.setCert(result.data)
      } else {
        console.log(result)
      }
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="scss">
.view-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 240px;

  p.text-center {
    overflow-wrap: break-word;
    max-width: 90vw;
  }
}
</style>
