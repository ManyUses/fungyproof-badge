<template>
  <div class="view-grade">
    <v-row
      v-if="grade"
      flex
      align="center"
    >
      <v-col>
        <v-img
          :src="`img/fungy-grade-badge-${grade.grade.toLowerCase()}.jpg`"
          max-width="240"
        />
      </v-col>
      <v-col>
        <v-list>
          <v-list-item>Eco Impact: {{ grade.environment.score }}/{{ grade.environment.max }}</v-list-item>
          <v-list-item>Immutability: {{ grade.immutability.score }}/{{ grade.immutability.max }}</v-list-item>
          <v-list-item>Metadata: {{ grade.metadata.score }}/{{ grade.metadata.max }}</v-list-item>
          <v-list-item>Marketability: {{ grade.marketability.score }}/{{ grade.marketability.max }}</v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <div
      v-else
      class="d-flex align-center justify-center"
    >
      <v-img
        src="https://uploads-ssl.webflow.com/605cf63e34019e5e7e82d5a3/605e2aaea72d2f57be1c4001_circle-loader.gif"
        max-width="50"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { getChain } from '@fungyproof/eth-nft'
import { gradeNFT } from '@/utils/api'
import { AppModule } from '@/store/modules/app'
import { AuthModule } from '@/store/modules/auth'

@Component({
  name: 'Grade',
  components: {}
})
export default class extends Vue {
  private grade: any = null

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
      this.grade = data?.data?.grade
    }
  }
}
</script>

<style lang="scss" scoped>
.view-grade {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 240px;
}
</style>
