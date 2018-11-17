// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 全局引入vue-axios
import VueAxios from 'vue-axios'
import axios from 'axios'
// 全局引入MuseUI
import Muse from './muse-ui.config'
// 全局引入_base.scss
import './public/scss/_base.scss'
// 全局引入Vuex
import store from './store'

Vue.config.productionTip = false
// 使用MuseUI
Vue.use(Muse)
// 使用vue-axios
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// 全局监听页面跳转
router.beforeEach((to, from, next) => {
  store.commit('CHANGE_NAV_TITLE', to.name)
  next()
})
// 设定默认路径
router.replace('discover')
