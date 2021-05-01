declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.json' {
  const value: { [key: string]: any }
  export default value
}

declare module '*.svg' {
  const value: string
  export default value
}
