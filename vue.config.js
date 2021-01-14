const { VUE_APP_PUBLIC_PATH, VUE_APP_API_BASE, VUE_APP_API_URL } = process.env;

module.exports = {
  publicPath: VUE_APP_PUBLIC_PATH,
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      [VUE_APP_API_BASE]: {
        target: VUE_APP_API_URL,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  productionSourceMap: false
};
