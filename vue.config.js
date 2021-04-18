const DEV_PORT = 9527
const NAME = 'FungyProof'
const ENV = process.env.NODE_ENV

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: ENV === 'development',
  publicPath: '/',
  productionSourceMap: false,
  devServer: {
    port: DEV_PORT,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  css: {
    extract: false
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', NAME)
  }
}
