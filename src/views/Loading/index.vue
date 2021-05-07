<template>
  <div class="view-loading">
    <div>
      <v-img
        contain
        max-width="50"
        style="margin: 0 auto;"
        src="https://fungyproof.com/images/loader.gif"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Loading',
  components: {}
})
export default class extends Vue {}
</script>
<style lang="scss" scoped>
.view-loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 260px;
  padding: 0 20px;
}
</style>
