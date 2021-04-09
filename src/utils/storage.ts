import Cookies from 'js-cookie'

// App
const onboardingKey = `${process.env.VUE_APP_NAME}_onboarding`
export const getOnboarding = () => localStorage.getItem(onboardingKey)
export const setOnboarding = (value: string) => localStorage.setItem(onboardingKey, value)

const sidebarStatusKey = `${process.env.VUE_APP_NAME}_sidebar_status`
export const getSidebarStatus = () => localStorage.getItem(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => localStorage.setItem(sidebarStatusKey, sidebarStatus)

const languageKey = `${process.env.VUE_APP_NAME}_language`
export const getLanguage = () => localStorage.getItem(languageKey)
export const setLanguage = (language: string) => localStorage.setItem(languageKey, language)

const sizeKey = `${process.env.VUE_APP_NAME}_size`
export const getSize = () => localStorage.getItem(sizeKey)
export const setSize = (size: string) => localStorage.setItem(sizeKey, size)

// Auth
const addrKey = `${process.env.VUE_APP_NAME}_payload`
export const getAddress = () => Cookies.get(addrKey)
export const clearAddress = () => Cookies.remove(addrKey)
