<template>
  <div class="view-main">
    <ConnectBtn />
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
  background-image: url("https://fungyproof.com/images/fungyproof-badge.jpg");
  background-size: contain;

  .title {
    text-transform: uppercase;
  }
}
</style>
