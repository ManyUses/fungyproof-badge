import Vue from 'vue'
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import {
  getSize,
  setLanguage,
  setSize,
  setOnboarding
} from '@/utils/storage'
import { getLocale } from '@/lang'

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
  grade: any
}

@Module({ name: 'app', stateFactory: true })
export class AppModule extends VuexModule implements IAppState {
  public dialog: DialogState = {
    account: false
  }

  public device = DeviceType.Desktop
  public language = getLocale()
  public size = getSize() || 'medium'

  public view = 'Loading'
  public contract = ''
  public tokenId = ''
  public networkId = ''
  public grade = null

  @Mutation
  private SET_VIEW(view: string) {
    this.view = view
  }

  @Mutation
  private SET_TOKEN_ADDRESS(contract: string) {
    this.contract = contract
  }

  @Mutation
  private SET_TOKEN_ID(tokenId: string) {
    this.tokenId = tokenId
  }

  @Mutation
  private SET_NETWORK_ID(network: string) {
    this.networkId = network
  }

  @Mutation
  private SET_GRADE(grade: any) {
    this.grade = grade
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
  public setToken(token: {
    contract: string
    id: string
    networkId: string
  }) {
    this.SET_TOKEN_ADDRESS(token.contract)
    this.SET_TOKEN_ID(token.id || '')
    this.SET_NETWORK_ID(token.networkId)
  }

  @Action
  public toggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Action
  public setDialogState(state: {
    dialog: string
    state: boolean
  }) {
    this.SET_DIALOG_STATE(state)
  }

  @Action
  public setLanguage(language: string) {
    this.SET_LANGUAGE(language)
  }

  @Action
  public setSize(size: string) {
    this.SET_SIZE(size)
  }

  @Action
  public setGrade(grade: any) {
    this.SET_GRADE(grade)
  }

  @Action
  public setView(view: string) {
    this.SET_VIEW(view)
  }
}
