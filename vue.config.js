// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const DEV_PORT = 9527
const NAME = 'FungyProof'
const ENV = process.env.NODE_ENV

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: ENV === 'development',
  publicPath: (~['production', 'stage'].indexOf(ENV)) ? '/embed/' : '/',
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
  pwa: {
    name: NAME,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.resolve(__dirname, 'src/pwa/service-worker.js')
    },
    iconPaths: {
      favicon32: 'img/favicon-32x32.png',
      favicon16: 'img/favicon-16x16.png',
      appleTouchIcon: 'img/apple-touch-icon-152x152.png',
      maskIcon: 'img/safari-pinned-tab.svg',
      msTileImage: 'img/msapplication-icon-144x144.png'
    },
    manifestOptions: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      background_color: '#FFFFFF',
      icons: [
        {
          src: 'img/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'img/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'img/android-chrome-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: 'img/android-chrome-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  },
  chainWebpack(config) {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', NAME)
  }
}
