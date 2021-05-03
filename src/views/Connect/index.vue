<template>
  <div class="view-main">
    <div>
      <v-img
        contain
        max-width="200"
        style="margin: 0 auto;"
        src="https://fungyproof.com/images/fungy-logo-black.jpg"
      />
      <p class="text-center my-4">
        Connect a wallet to verify ownership of your NFT badge.
      </p>
      <ConnectBtn />
    </div>
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
}
</script>
<style lang="scss" scoped>
.view-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 260px;
  padding: 0 20px;

  .title {
    text-transform: uppercase;
  }
}
</style>
