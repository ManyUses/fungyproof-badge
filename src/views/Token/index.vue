<template>
  <div class="view-token">
    <v-img
      src="img/badge-white.jpg"
      max-width="240"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { AuthModule } from '@/store/modules/auth'

@Component({
  name: 'Token',
  components: {}
})
export default class extends Vue {
  private get authModule() {
    return getModule(AuthModule, this.$store)
  }

  private get address() {
    return this.authModule.address
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
