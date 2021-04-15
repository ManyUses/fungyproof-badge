import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getAddress } from '@/utils/storage'
import store from '@/store'

export interface IAuthState {
  provider: any
  address: string
}

@Module({ dynamic: true, store, name: 'auth' })
class Auth extends VuexModule implements IAuthState {
  public address = getAddress() || ''
  public provider = null
  public verified = false

  @Mutation
  private SET_ADDRESS(address: string) {
    this.address = address
  }

  @Mutation
  private SET_PROVIDER(provider: any) {
    this.provider = provider
  }

  @Mutation
  private SET_VERIFIED(verified: boolean) {
    this.verified = verified
  }

  @Action
  public setAddress(address: string) {
    this.SET_ADDRESS(address)
  }

  @Action
  public setProvider(provider: any) {
    this.SET_PROVIDER(provider)
  }

  @Action
  public setVerified(verified: boolean) {
    this.SET_VERIFIED(verified || false)
  }
}

export const AuthModule = getModule(Auth)
