import Vue from "vue";
import App from "./App.vue";
import routes from "./router";
import store from "./store";
import { globalRegister } from "global-state";
import VueRouter from "vue-router";
import { name } from "../package.json";

Vue.config.productionTip = false;

let install = null;
function render(props = {}) {
  const { container } = props;
  const router = new VueRouter({
    // base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL,
    // mode: "history",
    routes
  });
  if (window.__POWERED_BY_QIANKUN__) {
    router.beforeEach((to, from, next) => {
      if (!to.path.includes("/micrApp")) {
        next({ path: `/micrApp/${name}${to.path}` });
      } else {
        next();
      }
    });
  }
  install = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector("#app") : "#app");
}
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  // 这里是子应用独立运行的环境，实现子应用的登录逻辑
  // 独立运行时，也注册一个名为global的store module
  globalRegister(store);
  // 模拟登录后，存储用户信息到global module
  const userInfo = { name: "我是独立运行时名字叫张三" }; // 假设登录后取到的用户信息
  store.commit("global/setGlobalState", { user: userInfo });
  render();
}

export async function bootstrap() {}

export async function mount(props) {
  console.log("[vue] props from main framework", props);
  globalRegister(store, props);
  render(props);
}
export async function unmount() {
  install.$destroy();
  install.$el.innerHTML = ""; // 子项目内存泄露问题
  install = null;
}
