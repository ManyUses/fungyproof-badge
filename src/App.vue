<template>
  <div id="app">
    <service-worker-update-popup />
    <Views />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue'
import Views from '@/views/index.vue'

@Component({
  name: 'App',
  components: {
    ServiceWorkerUpdatePopup,
    Views
  }
})
export default class extends Vue {
  beforeMount() {
    // console.log(`FungyProof`)
  }
}
</script>
<style lang="scss">
 #nprogress .bar {
   background: var(--v-primary-base) !important;
 }
</style>
<style lang="scss" scoped>
::v-deep {
  .v-application--wrap {
    min-height: auto !important;
  }
}
</style>
