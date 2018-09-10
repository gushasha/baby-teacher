// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from './router'
import VueRouter from 'vue-router'
import { TransferDom, ToastPlugin, Loading, DatetimePlugin } from 'vux'
import 'styles/iconfont.css'
import 'styles/border.css'
import 'styles/panel.css'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import VConsole from 'vconsole'
import store from './store/index'
import auth from './auth/auth.js'

Vue.use(require('vue-wechat-title'))
Vue.use(VueRouter)
let previewOptions = {
  loop: false,
  fullscreenEl: false,
  tapToClose: true
}
Vue.use(preview, previewOptions)
FastClick.attach(document.body)
Vue.use(ToastPlugin)
Vue.use(Loading)
Vue.directive('transfer-dom', TransferDom)
Vue.use(DatetimePlugin)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    /* eslint-disable no-new */
    let showConsole = false
    if (showConsole) {
      new VConsole()
    }
  }
}).$mount('#app-box')
