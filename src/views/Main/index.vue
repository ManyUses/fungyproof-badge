<template>
  <div class="view-main">
    <ConnectBtn v-if="!address" />
    <v-img v-else src="img/badge-white.jpg" max-width="300" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthModule } from '@/store/modules/auth'
import ConnectBtn from '@/components/ConnectBtn/index.vue'

@Component({
  name: 'Main',
  components: {
    ConnectBtn
  }
})
export default class extends Vue {
  get address() {
    return AuthModule.address
  }
}
</script>

<style lang="scss" scoped>
.view-main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style>
