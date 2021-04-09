import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getAddress, clearAddress } from '@/utils/storage'
import store from '@/store'
import { clear } from 'node:console'

export interface IAuthState {
  provider: any
  address: string
}

@Module({ dynamic: true, store, name: 'auth' })
class Auth extends VuexModule implements IAuthState {
  public address = getAddress() || ''
  public provider = null

  @Mutation
  private SET_ADDRESS(address: string) {
    this.address = address
  }

  @Mutation
  private SET_PROVIDER(provider: any) {
    this.provider = provider
  }

  @Action
  public setAddress(address: string) {
    this.SET_ADDRESS(address)
  }

  @Action
  public setProvider(provider: any) {
    this.SET_PROVIDER(provider)
  }
}

export const AuthModule = getModule(Auth)
