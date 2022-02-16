module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.25.21:10001/", // 后台接口域名
        ws: false, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  }
};
