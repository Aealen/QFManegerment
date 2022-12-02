<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import SideMenu from "./components/SideMenu";
import Login from "./components/Login";
export default {
  name: 'App',
  components: {Login, SideMenu}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  width: 100%;
  height: 100%;
  /*margin-top: 60px;*/
}
.pageHeader{
  width: 100%;
}
.sideMenu{
  height: 100%;
}
</style>
