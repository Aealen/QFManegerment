import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import WorkSpace from "../components/WorkSpace";
import Login from "../components/Login";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },{
      path:'/workspace',
      component:WorkSpace
    }
  ]
})
