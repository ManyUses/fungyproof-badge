import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import { getAddress } from '@/utils/storage'

export type NFTCertificate = {
  networkId: number
  address: string // account address
  signature: string // original signature
  timestamp: number // unix time certificate was issued
}

export interface IAuthState {
  provider: any
  address: string
  cert: NFTCertificate|null
}

@Module({ name: 'auth', stateFactory: true })
export class AuthModule extends VuexModule implements IAuthState {
  public address = getAddress() || ''
  public provider = null
  public cert = null

  @Mutation
  private SET_ADDRESS(address: string) {
    this.address = address
  }

  @Mutation
  private SET_PROVIDER(provider: any) {
    this.provider = provider
  }

  @Mutation
  private SET_CERT(cert: any) {
    this.cert = cert
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
  public setCert(cert: any) {
    this.SET_CERT(cert || null)
  }
}
