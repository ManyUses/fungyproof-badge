<template>
  <div>
    <Views />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Views from '@/views/index.vue'

@Component({
  name: 'App',
  components: {
    Views
  }
})
export default class extends Vue {}
</script>
<style lang="scss">
.v-application {
  font-size: 16px;
}
#nprogress .bar {
   background: var(--v-primary-base) !important;
}
.web3modal-modal-lightbox {
  font-family: 'Degarism studio fracktif', Helvetica, sans-serif
}
</style>
<style lang="scss" scoped>
@font-face {
  font-family: 'Degarism studio fracktif';
  src: url('https://uploads-ssl.webflow.com/605cf63e34019e5e7e82d5a3/605cfb3e0fe9e6840d7fbe01_Degarism%20Studio%20-%20Fracktif%20Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Degarism studio fracktif';
  src: url('https://uploads-ssl.webflow.com/605cf63e34019e5e7e82d5a3/605cfb3eccc0824233915969_Degarism%20Studio%20-%20Fracktif%20Bold%20Italic.otf') format('opentype');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Degarism studio fracktif';
  src: url('https://uploads-ssl.webflow.com/605cf63e34019e5e7e82d5a3/605d00c3ef166c4f52e41d68_Degarism%20Studio%20-%20Fracktif%20Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
::v-deep {
  .v-application--wrap {
    min-height: auto !important;
  }
}
</style>
