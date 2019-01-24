import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import VuePortal from '~/components/portal-vue.min'

const navFooter = document.getElementById('console-nav-footer')
const container = document.createElement('div')
navFooter.innerHTML = ''
navFooter.appendChild(container)

Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VuePortal)

const app = new Vue({
  name: 'App',
  el: container,
  router,
  template: `
    <div style="color: white">
      <router-view/>
    </div>
  `
})
