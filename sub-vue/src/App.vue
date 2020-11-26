<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div>从vuex的global module的state： {{ JSON.stringify(user) }}</div>
    <button @click="update">更新</button>
    <router-view />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    // 通过global获取user的信息
    ...mapState("global", {
      user: state => state.user
    })
  },
  methods: {
    ...mapActions("global", ["setGlobalState"]),
    update() {
      const obj = {
        user: {
          name: "zhangsan"
        }
      };
      this.setGlobalState(obj);
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
