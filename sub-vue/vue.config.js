/*
 * @Author: wuzhiquan
 * @Date: 2020-11-25
 */
const port = 5501;
const { name } = require("../package.json");
module.exports = {
  publicPath: "./",
  transpileDependencies: ["global-state"],
  devServer: {
    port,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
};
