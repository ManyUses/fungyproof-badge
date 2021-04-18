import axios from 'axios'
import { NotificationsModule } from '@/store/modules/notifications'
import { getModule } from 'vuex-module-decorators'

/**
 * ENV / URLS
 */
const ENV = process.env.VUE_APP_ENVIRONMENT
const API_ENDPOINT = process.env[`VUE_APP_${ENV}_API_ENDPOINT`]

export const PROTOCOL = (ENV === 'DEV') ? 'http://' : 'https://'
export const API_HOST = `${PROTOCOL}${API_ENDPOINT}`

/**
 * Axios Request Helper
 */
/* eslint-disable */
const service = axios.create({
  baseURL: API_HOST,
  timeout: 5000,
  withCredentials: true, // send cookies
  headers: { 'x-requested-with': 'nrg-embed' } // set header for csrf
})

// Response interceptors
// code == 200: success
// code == 201: created
// code == 400: bad request
// code == 401: unauthorized
// code == 403: bad permissions
// code == 429: rate limit
service.interceptors.response.use(
  (response) => (response),
  (error) => {
    const notificationsModule = getModule(NotificationsModule)
    const status = error.response ? error.response.status : ''
    switch (status) {
      case 400:
        const errors = error.response.data.errors
        const message = errors ? JSON.stringify(error.response.data.errors, null, 2) : error.response.data.message
        
        notificationsModule.queue({
          message,
          color: 'error'
        })
        break
      case 401:
        notificationsModule.queue({
          message: 'You do not have permissions to perform this action',
          color: 'warning',
          action: () => {
           // action on dismiss
          }
        })
        break
      case 403:
        notificationsModule.queue({
          message: 'You do not have permissions to perform this action',
          color: 'warning',
          action: () => {
           // action on dismiss
          }
        })
        break
      case 429:
        notificationsModule.queue({
          message: 'Too many requests, please wait',
          color: 'warning'
        })
        break
      default:
        notificationsModule.queue({
          message: error.response ? error.response.data.message : error.message,
          color: 'error'
        })
    }
    return Promise.reject(error)
  }
)

export default service
