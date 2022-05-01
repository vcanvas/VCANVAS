module.exports = {
  publicPath:'./' ,
  devServer: {
    host: "localhost",
    port: 8089,
    proxy: {
      "/": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        pathRewrite: {
          "/": "",
        },
      },
    },
  },
};
