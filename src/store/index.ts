import Vue from 'vue'
import Vuex from 'vuex'
import { IAuthState, AuthModule } from './modules/auth'
import { IAppState, AppModule } from './modules/app'
import { INotificationState, NotificationsModule } from './modules/notifications'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  notifications: INotificationState
  auth: IAuthState
}

// create store
export function createStore() {
  return new Vuex.Store<IRootState>({
    modules: {
      app: AppModule,
      notifications: NotificationsModule,
      auth: AuthModule
    }
  })
}
