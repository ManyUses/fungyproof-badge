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

const RI_ICONS = {
  complete: '...',
  cancel: '...',
  close: 'ri-close-line',
  delete: 'ri-delete-bin-line', // delete (e.g. v-chip close)
  clear: 'ri-close-line',
  success: 'ri-check-double-line',
  info: 'ri-information-line',
  warning: 'ri-error-warning-line',
  error: 'ri-error-warning-line',
  prev: 'ri-arrow-left-s-line',
  next: 'ri-arrow-right-s-line',
  checkboxOn: 'ri-checkbox-line',
  checkboxOff: 'ri-checkbox-blank-line',
  checkboxIndeterminate: 'ri-checkbox-indeterminate-line',
  delimiter: '...', // for carousel
  sort: 'ri-sort-line',
  expand: 'ri-arrow-down-s-line',
  menu: 'ri-menu-line',
  subgroup: '...',
  dropdown: 'ri-arrow-down-s-line',
  radioOn: 'ri-checkbox-circle-line',
  radioOff: 'ri-checkbox-blank-circle-line',
  edit: 'ri-pencil-line',
  ratingEmpty: 'ri-star-line',
  ratingFull: 'ri-star-fill',
  ratingHalf: 'ri-star-half-fill',
  loading: '...',
  first: '...',
  last: '...',
  unfold: '...',
  file: 'ri-file-line',
  plus: 'ri-plus'
}

export default new Vuetify({
  icons: {
    values: RI_ICONS
  },
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
