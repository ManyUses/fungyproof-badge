<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-x
    :max-width="260"
    :nudge-right="10"
  >
    <template v-slot:activator="{on, attrs}">
      <v-btn
        :color="color"
        class="ma-2 account"
        dark
        fab
        x-small
        v-bind="attrs"
        v-on="on"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        ><path
          fill="none"
          d="M0 0h24v24H0z"
        /><path
          fill="white"
          d="M18 7h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h15v4zM4 9v10h16V9H4zm0-4v2h12V5H4zm11 8h3v2h-3v-2z"
        /></svg>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ address ? address : 'Not Connected' }}</v-list-item-title>
            <v-list-item-subtitle>
              Chain: <a
                :href="chainURL"
                target="_blank"
              >{{ chainName }}</a>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list>
        <v-list-item>
          <v-btn
            small
            block
            color="primary"
            class="font-weight-bold"
            @click="showModal"
          >
            <span v-if="address">Change Wallet</span>
            <span v-else>Connect Wallet</span>
          </v-btn>
        </v-list-item>
        <v-list-item v-if="address">
          <v-btn
            small
            block
            color="default"
            class="font-weight-bold"
            @click="disconnect"
          >
            Disconnect
          </v-btn>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer />

        <v-btn
          text
          small
          @click="menu = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { AuthModule } from '@/store/modules/auth'
import { EventBus } from '@/event-bus'
import { getChain } from '@fungyproof/eth-nft'

// import WalletConnectProvider from '@walletconnect/web3-provider'
// import Fortmatic from 'fortmatic'
// import Torus from '@toruslabs/torus-embed'

@Component({
  name: 'Account'
})
export default class extends Vue {
  private menu = false
  private modal: any = null
  private loaded = false

  private get authModule() {
    return getModule(AuthModule, this.$store)
  }

  private get color() {
    return this.address ? 'success' : 'primary'
  }

  private get address() {
    return this.authModule.address
  }

  private get provider() {
    return this.authModule.provider
  }

  private get chainId() {
    return (this.authModule.provider as any)?.chainId
  }

  private get chain() {
    return getChain(this.chainId)
  }

  private get chainName() {
    return this.chainId ? this.chain?.name : 'n/a'
  }

  private get chainURL() {
    return this.chainId ? this.chain?.infoURL : '#'
  }

  private async mounted() {
    const Web3Modal = (window as any).Web3Modal.default

    // init web3 modal
    this.modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      // TODO enable once we get signing
      // sorted on all providers
      providerOptions: {
        cacheProvider: false
        // walletconnect: {
        //   package: WalletConnectProvider,
        //   options: {
        //     infuraId: '8629530900274ca9bd4bc62e37f65052'
        //   }
        // }
        // fortmatic: {
        //   package: Fortmatic,
        //   options: {
        //     key: 'pk_live_4A196B9CF3B7972D'
        //   }
        // },
        // torus: {
        //   package: Torus
        // }
      }
    })

    // listen to toggle
    EventBus.$on('toggleModal', () => this.modal.toggleModal())

    // setup provider
    // this.modal.clearCachedProvider()
    this.modal.clearCachedProvider()
    this.modal.on('connect', (provider: any) => {
      this.authModule.setAddress(provider?.selectedAddress)
      this.authModule.setProvider(provider)

      // handle account changes
      provider.on('accountsChanged', (addresses: string[]) => {
        // console.log(addresses)
        this.authModule.setAddress(provider.selectedAddress)
      })
    })

    // connect if provider is cached
    if (this.modal.cachedProvider) {
      await this.modal.connect()
    }

    this.loaded = true
  }

  private async showModal() {
    await this.modal.clearCachedProvider()
    this.modal.toggleModal()
    this.menu = false
  }

  private async disconnect() {
    if ((this.provider as any)?.close) {
      await (this.provider as any)?.close()
    }
    await this.modal.clearCachedProvider()
    this.authModule.setAddress('')
  }
}
</script>
<style scoped>
.account {
  position: absolute;
  z-index: 2;
}
</style>
