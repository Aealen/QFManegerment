import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SideMenu from "../components/SideMenu";
import Login from "../components/Login";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path:'/sidemenu',
      name:'Login',
      component:Login
    },{
      path:'/workspace',
      component:SideMenu
    }
  ]
})
