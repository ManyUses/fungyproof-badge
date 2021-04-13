import Vue from 'vue'
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import {
  getSize,
  setLanguage,
  setSize,
  setOnboarding
} from '@/utils/storage'
import { getLocale } from '@/lang'
import store from '@/store'

export enum DeviceType {
  Mobile,
  Desktop,
}

type DialogState = {
  [key: string]: boolean
}

export interface IAppState {
  device: DeviceType
  dialog: DialogState
  language: string
  size: string
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public dialog: DialogState = {
    account: false
  }

  public device = DeviceType.Desktop
  public language = getLocale()
  public size = getSize() || 'medium'

  public tokenAddress = ''
  public tokenId = ''
  public tokenVerified = false

  @Mutation
  private SET_TOKEN_ADDRESS(tokenAddress: string) {
    this.tokenAddress = tokenAddress
  }

  @Mutation
  private SET_TOKEN_ID(tokenId: string) {
    this.tokenId = tokenId
  }

  @Mutation
  private SET_TOKEN_VERIFIED(verified: boolean) {
    this.tokenVerified = verified
  }

  @Mutation
  private SET_DIALOG_STATE(state: {
    dialog: string
    state: boolean
  }) {
    if (!state.state && state.dialog === 'onboarding') {
      setOnboarding(new Date().toISOString())
    }
    Vue.set(this.dialog, state.dialog, state.state)
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language
    setLanguage(this.language)
  }

  @Mutation
  private SET_SIZE(size: string) {
    this.size = size
    setSize(this.size)
  }

  @Action
  public SetToken(token: {
    address: string
    id: string
    verified: boolean
  }) {
    console.log(token)
    this.SET_TOKEN_ADDRESS(token.address)
    this.SET_TOKEN_ID(token.id || '')
    this.SET_TOKEN_VERIFIED(token.verified || false)
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Action
  public SetDialogState(state: {
    dialog: string
    state: boolean
  }) {
    this.SET_DIALOG_STATE(state)
  }

  @Action
  public SetLanguage(language: string) {
    this.SET_LANGUAGE(language)
  }

  @Action
  public SetSize(size: string) {
    this.SET_SIZE(size)
  }
}

export const AppModule = getModule(App)
