<template>
  <div class="view-grade">
    <v-row flex align="center">
      <v-col>
        <v-img
          src="img/grade-badge-b.jpg"
          max-width="240"
        />
      </v-col>
      <v-col>
        <v-list>
          <v-list-item>Eco Impact: 0/2</v-list-item>
          <v-list-item>Immutability: 2/3</v-list-item>
          <v-list-item>Metadata: 2/3</v-list-item>
          <v-list-item>Marketability: 1/2</v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthModule } from '@/store/modules/auth'

@Component({
  name: 'Grade',
  components: {}
})
export default class extends Vue {
  get address() {
    return AuthModule.address
  }
}
</script>

<style lang="scss" scoped>
.view-grade {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 240px;
}
</style>
