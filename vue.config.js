const {GenerateSW} = require('workbox-webpack-plugin');
module.exports = {
    // ...other vue-cli plugin options...
    configureWebpack: {
        plugins: [
          new GenerateSW()
        ]
      },
    pwa: {
      name: 'Leccel.net',
      themeColor: '#4d7cff',
      msTileColor: '#2b0d0d',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      iconPaths: {
        favicon32: 'img/icons/favicon-32x32.png',
        favicon16: 'img/icons/favicon-16x16.png',
        appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
        maskIcon: 'img/icons/safari-pinned-tab.svg',
        msTileImage: 'img/icons/msapplication-icon-144x144.png'
      },
      manifestPath: 'manifest.json',
      manifestOptions: {}
    }
  }