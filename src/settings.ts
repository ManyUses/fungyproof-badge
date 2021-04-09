interface ISettings {
  title: string // Overrides the default title
  errorLog: string[] // The env to enable the errorlog component, default 'production' only
}

const settings: ISettings = {
  title: 'FungyProof',
  errorLog: ['production', 'development', 'local']
}

export default settings
