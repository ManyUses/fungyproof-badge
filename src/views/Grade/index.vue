<template>
  <div class="view-grade">
    <div
      v-if="grade"
      class="grade-wrap"
    >
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
      <v-avatar
        v-if="grade"
        size="160"
        class="ma-4"
        @click="$emit('change', 'grade')"
      >
        <v-img
          :src="`https://fungyproof.com/images/badge-${grade.grade.toLowerCase()}.jpg`"
        />
      </v-avatar>
      <v-expansion-panels
        accordion
        class="mt-4"
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            Eco Impact: {{ grade.environment.score }}/{{ grade.environment.max }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-left">
            <div class="d-block">
              <span v-html="grade.environment.message" />
              <v-btn
                href="https://offsetra.com/buy/by-the-tonne"
                target="_blank"
                class="mt-4"
                small
                block
                color="primary"
                :ripple="false"
              >
                Buy Carbon Offsets
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Immutability: {{ grade.immutability.score }}/{{ grade.immutability.max }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-left">
            <span v-html="grade.immutability.message" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Metadata: {{ grade.metadata.score }}/{{ grade.metadata.max }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-left">
            <span v-html="grade.metadata.message" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Marketability: {{ grade.marketability.score }}/{{ grade.marketability.max }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-left">
            <span v-html="grade.marketability.message" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
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
        contract: this.appModule.contract,
        tokenId: this.appModule.tokenId
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
  min-height: 260px;

  .grade-wrap {
    position: relative;
    text-align: center;
    min-width: 260px;

    .v-list-item {
      justify-content: center;
    }

    .v-btn.close {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
    }
  }
}
</style>
