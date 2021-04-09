import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { getLanguage } from '@/utils/storage'

// element-ui built-in lang
import vEnLocale from 'vuetify/src/locale/en'
import vEsLocale from 'vuetify/src/locale/es'

// User defined lang
import enLocale from './en'
import esLocale from './es'

Vue.use(VueI18n)

const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD'
    }
  }
}

const messages = {
  en: {
    ...enLocale,
    $vuetify: vEnLocale
  },
  es: {
    ...esLocale,
    $vuetify: vEsLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }

  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (~language.indexOf(locale)) {
      return locale
    }
  }

  // Default language is english
  return 'en'
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: getLocale(),
  numberFormats,
  messages
})

export default i18n
