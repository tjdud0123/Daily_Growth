<template>
  <div id="app" class="m-0">
    <router-link to="/posts/new" exact>New Post</router-link>
    <router-link to="/posts/detail" exact>New Post</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import Buefy from 'buefy';
Vue.use(Buefy);

export default {
  name: 'App',
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
