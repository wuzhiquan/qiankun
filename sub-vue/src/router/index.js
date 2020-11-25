import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

let prefix = "/";
if (window.__POWERED_BY_QIANKUN__) {
  prefix = "/micrApp/sub-vue/";
}

const routes = [
  {
    path: prefix === "/" ? prefix : "/micrApp/sub-vue",
    name: "Home",
    component: Home
  },
  {
    path: `${prefix}about`,
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

export default routes;
