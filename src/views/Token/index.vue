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
import { AuthModule } from '@/store/modules/auth'

@Component({
  name: 'Token',
  components: {}
})
export default class extends Vue {
  get address() {
    return AuthModule.address
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
