/**
 * 注意name应与子项目的package里的name字段保持一致，activeRule后面的地址与name保持一致。这个地址不管在生产环境还是开发环境，访问子项目时的地址都不会变的，但是子项目的访问地址entry会随环境变化。比如本例vue子项目在开发环境地址是http://localhost:5501，生产环境是http://localhost:5050/subapp/sub-vue/#/
 * 增加micrApp前缀主要是给路由守卫做判断，如果以micrApp开头则表示是子项目
 * VUE_APP_SUB_VUE/VUE_APP_SUB_REACT：
 *    开发环境是子项目运行的地址加端口（注意留意子项目的publicPath，需要保持一致。本例子是纯IP地址加端口，publicPath应为./，vue项目在vue.config.js中配置，react项目在.env.development中配置）
 *    生产环境下需要注意要和发布地址保持一致。本例子发布需要在main中创建subapp，在subapp下分别在创建sub-vue和sub-react，所以地址为http://localhost:5050/subapp/sub-vue/格式
 */
import store from './store'
const microApps = [
  {
    name: 'sub-vue',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/#/micrApp/sub-vue'
  },
  {
    name: 'sub-react',
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: '/#/micrApp/sub-react'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState, // 下发getGlobalState方法
    }
  }
})

export default apps
