import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'

export type INotification = {
  color: string
  message: string
  action?: () => any|null
}

export interface INotificationState {
  notifications: INotification[]
}

@Module({ dynamic: true, store, name: 'notifications' })
class Notification extends VuexModule implements INotificationState {
  public notifications: INotification[] = []

  @Mutation
  private ADD_NOTIFICATION(notification: INotification) {
    this.notifications.unshift(notification)
  }

  @Mutation
  private REMOVE_NOTIFICATION() {
    this.notifications.shift()
  }

  @Mutation
  private CLEAR_NOTIFICATIONS(force = false) {
    if (force) {
      this.notifications = []
    } else {
      this.notifications = this.notifications.filter((n: INotification) => (n.action))
    }
  }

  /**
   * Add notification to queue
   * @param notification
   */
  @Action
  public queue(notification: INotification) {
    this.ADD_NOTIFICATION(notification)
  }

  /**
   * Remove notification from queue
   */
  @Action
  public dequeue() {
    this.REMOVE_NOTIFICATION()
  }

  /**
   * Clear notification view
   * @param force force clear notifications even with actions
   */
  @Action
  public clear(force?: boolean) {
    this.CLEAR_NOTIFICATIONS(force)
  }
}

export const NotificationsModule = getModule(Notification)
