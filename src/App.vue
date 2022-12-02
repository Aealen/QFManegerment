<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import SideMenu from "./components/WorkSpace";
export default {
  name: 'App',
  components: {SideMenu}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.sideMenu{
  height: 100%;
}
</style>
