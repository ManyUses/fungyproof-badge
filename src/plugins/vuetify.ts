import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/lang'
import { isDarkMode } from '@/utils/theme'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(Vuetify, {
  lang: {
    t: (key: string, ...params: any[]) => i18n.t(key, params)
  }
})

export default new Vuetify({
  theme: {
    dark: isDarkMode(),
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#000000',
        secondary: '#262626',
        accent: '#8D75FF',
        error: '#FC6753',
        info: '#FFD911',
        success: '#0CC879',
        warning: '#FFA011',
        background: '#FFFFFF'
      },
      dark: {
        primary: '#000000',
        secondary: '#262626',
        accent: '#8D75FF',
        error: '#FC6753',
        info: '#FFD911',
        success: '#0CC879',
        warning: '#FFA011',
        background: '#1E1E1E'
      }
    }
  }
})
