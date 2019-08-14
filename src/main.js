// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from '@/utils/axios'
import 'lib-flexible'
import '@/assets/style/reset.less'
import { XButton, Alert } from 'vux'
Vue.component('x-button', XButton)
Vue.component('alert', Alert)
Vue.prototype.axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
