import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'

const navFooter = document.getElementById('console-nav-footer')
const container = document.createElement('div')
navFooter.innerHTML = ''
navFooter.appendChild(container)

Vue.config.debug = true
Vue.use(VueRouter)

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

console.log(app)
