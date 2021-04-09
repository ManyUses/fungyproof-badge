
/**
 * Determine Dark/light mode
 */
export const isDarkMode = () => {
  const cache = localStorage.getItem('fungyproof_dark')
  if (cache) return cache === 'true'
  return false
  // return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}
