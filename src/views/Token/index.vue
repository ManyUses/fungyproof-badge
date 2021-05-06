<template>
  <div>
    <v-img
      :src="image"
      min-height="260"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-img
            src="https://fungyproof.com/images/loader.gif"
            max-width="50"
          />
        </v-row>
      </template>
      <v-avatar
        v-if="grade"
        size="80"
        @click="$emit('change', 'grade')"
      >
        <v-img
          :src="`https://fungyproof.com/images/badge-${grade.grade.toLowerCase()}.jpg`"
        />
      </v-avatar>
    </v-img>
    <div class="addy d-flex pa-2 grey lighten-4">
      <span>Verified Owner:</span>
      <v-spacer />
      <v-btn
        outlined
        x-small
        target="_blank"
        :href="`https://etherscan.com/address/${address}`"
      >
        {{ address | shorten }}
      </v-btn>
    </div>
    <v-card-title>
      {{ meta ? meta.name : "loading..." }}
    </v-card-title>
    <v-card-text>
      <p>{{ meta ? meta.description : "loading..." }}</p>
    </v-card-text>
    <v-card-actions v-if="meta && meta.external_link">
      <v-btn
        color="primary"
        block
        target="_blank"
        :ripple="false"
        :href="meta.external_link"
      >
        View / Buy
      </v-btn>
    </v-card-actions>
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
  components: {},
  filters: {
    shorten(val: string) {
      return val && val.length >= 15
        ? val.substr(0, 8) + '...' + val.slice(-8)
        : val
    }
  }
})
export default class extends Vue {
  private image = null;
  private grade: any = null;
  private meta: any = null;

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

  private get address() {
    return (this.authModule.cert as any)?.address
  }

  private async mounted() {
    const cert: any = this.authModule.cert
    if (cert) {
      const { data } = await gradeNFT(
        {
          contract: this.appModule.contract,
          tokenId: this.appModule.tokenId
        },
        cert.networkId
      )
      this.image = data?.data?.image?.url
      this.grade = data?.data?.grade
      this.meta = data?.data?.metadata?.data
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  position: relative;

  .addy {
    font-size: 0.9em;
  }
}

.v-avatar {
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
