import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import VuePortal from '~/components/portal-vue.min'

const navFooter = document.getElementById('console-nav-footer')
const container = document.createElement('div')
navFooter.appendChild(container)

Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VuePortal)

const PREFS_KEY = 'AWS_CONSOLE_ENHANCER_PREFS'

const defaultPrefs = {
  theme: 'prism-theme--okaida'
}
const initialPrefs = JSON.parse(localStorage.getItem(PREFS_KEY)) || defaultPrefs

const app = new Vue({
  provide() {
    return {
      prefs: this.prefs
    }
  },
  name: 'App',
  el: container,
  router,
  data () {
    return {
      prefs: initialPrefs
    }
  },
  created () {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        localStorage.setItem(PREFS_KEY, JSON.stringify(request))
        this.$set(this.prefs, 'theme', request.theme)
      }
    )
  },
  watch: {
    prefs: {
      deep: true,
      handler (val) {
        localStorage.setItem(PREFS_KEY, JSON.stringify(val))
      }
    }
  },
  template: `
    <div style="color: white; display: flex; justify-content: flex-end;align-items:center;">
      <router-view/>
    </div>
  `
})
