<template>
  <div>
    <v-btn
      color="primary"
      class="font-weight-bold"
      block
      large
      @click="showConnect"
    >
      Connect Wallet
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { EventBus } from '@/event-bus'

@Component({
  name: 'ConnectBtn'
})
export default class extends Vue {
  private loaded = false

  private showConnect() {
    EventBus.$emit('toggleModal')
  }
}
</script>
<style lang="scss" scoped>
.terms {
  font-size: 0.7rem !important;
  font-weight: 400;
  line-height: 1rem;
  font-family: "Work Sans", sans-serif !important;

  a {
    text-decoration: underline;
  }
}
</style>
