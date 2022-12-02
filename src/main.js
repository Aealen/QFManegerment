// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSession from 'vue-session'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import jquery from 'jquery'

Vue.use(VueAxios, axios)
Vue.use(VueSession)
Vue.use(ElementUI);
Vue.use(jquery)


Vue.prototype.$axios = axios
Vue.prototype.$VueSession = VueSession
Vue.config.productionTip = false
axios.defaults.baseURL='http://10.80.0.26:8096';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
