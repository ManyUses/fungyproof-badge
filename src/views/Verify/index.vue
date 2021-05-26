<template>
  <div class="view-main">
    <v-btn
      icon
      class="close"
      @click="$emit('change', 'token')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          fill="none"
          d="M0 0h24v24H0z"
        />
        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
      </svg>
    </v-btn>
    <p class="text-center">
      <strong>ID:&nbsp;</strong><span>{{ tokenId | shorten }}</span><br>
      <strong>Contract:&nbsp;</strong><span>{{ contract | shorten }}</span><br>
      <strong>Domain:&nbsp;</strong>{{ origin }}<br>
      <strong>Network:&nbsp;</strong><span>{{ requiredNetwork ? requiredNetwork.name : '' }}</span><br>
      <span
        v-if="wrongNetwork"
        class="subtitle-2 red--text px-10 mt-2 d-block"
      >
        Connect your wallet to {{ requiredNetwork ? requiredNetwork.name : '' }} to verify.
      </span>
    </p>
    <v-btn
      color="primary"
      class="mt-2"
      :loading="loading"
      @click="certify"
    >
      Verify Ownership
    </v-btn>
    <v-fade-transition>
      <v-alert
        v-if="error"
        dense
        color="red lightn-2"
        class="white ma-2"
        outlined
        text
      >
        {{ error }}
      </v-alert>
    </v-fade-transition>
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
  components: {},
  filters: {
    shorten(val: string) {
      return (val && val.length >= 15) ? val.substr(0, 6) + '...' + val.slice(-6) : val
    }
  }
})
export default class extends Vue {
  private loading = false
  private error = ''

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

  private get networkId() {
    return this.appModule.networkId
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

  private get requiredNetwork() {
    return getChain(this.networkId)
  }

  private get wrongNetwork() {
    return this.chainId !== `0x${this.networkId}`
  }

  private async certify() {
    this.error = ''
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
        this.appModule.setView('Token')
      } else {
        this.error = 'Verification failed, check your network and selected address.'
      }
    } catch (err) {
      this.error = 'Verification failed, check your network and selected address.'
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
  min-height: 260px;

  .text-center {
    margin: 10px 0;
    font-size: 15px !important;
  }

  .v-btn.close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
}
</style>
