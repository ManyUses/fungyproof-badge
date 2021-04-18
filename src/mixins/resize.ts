import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { AppModule, DeviceType } from '@/store/modules/app'

const WIDTH = 992 // material responsive design

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  private get appModule() {
    return getModule(AppModule, this.$store)
  }

  public get device() {
    return this.appModule.device
  }

  private beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  public mounted() {
    const appModule = getModule(AppModule, this.$store)
    const isMobile = this.isMobile()
    if (isMobile) {
      appModule.toggleDevice(DeviceType.Mobile)
      // TODO mobile specific state changes
    }
  }

  private beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  private resizeHandler() {
    const appModule = getModule(AppModule, this.$store)

    if (!document.hidden) {
      const isMobile = this.isMobile()
      appModule.toggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile) {
        // TODO mobile specific state changes
      }
    }
  }
}
