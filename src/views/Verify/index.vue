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
import { getChain } from '@fungyproof/eth-nft'
import { AppModule } from '@/store/modules/app'
import { AuthModule } from '@/store/modules/auth'
import { certifyNFT } from '@/utils/api'

@Component({
  name: 'Verify',
  components: {}
})
export default class extends Vue {
  get contract() {
    return AppModule.contract
  }

  get tokenId() {
    return AppModule.tokenId
  }

  get origin() {
    return window.location.hostname
  }

  get provider() {
    return AuthModule.provider
  }

  get address() {
    return AuthModule.address
  }

  get chainId() {
    return (AuthModule.provider as any)?.chainId
  }

  get chain() {
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
        AuthModule.setVerified(true)
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
