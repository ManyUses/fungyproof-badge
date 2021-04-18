import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import { getAddress } from '@/utils/storage'

export interface IAuthState {
  provider: any
  address: string
}

@Module({ name: 'auth', stateFactory: true })
export class AuthModule extends VuexModule implements IAuthState {
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
