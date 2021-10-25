module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: "/",           /// live local
  devServer: {
    port: 8080, // CHANGE YOUR PORT HERE!
    proxy: {
      '^/api': {
        target: 'http://localhost/loginProject/',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug'
      },
    },

  }
}
