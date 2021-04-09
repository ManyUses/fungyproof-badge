import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from './modules/app'
import { INotificationState } from './modules/notifications'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  notifications: INotificationState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
