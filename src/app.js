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
      <select v-model="prefs.theme" style="height: 22px; margin: 0 0 0 10px;">
        <option value="prism-theme--default">Default</option>
        <option value="prism-theme--dark">Dark</option>
        <option value="prism-theme--okaida">Okaida</option>
        <option value="prism-theme--tomorrow-night">Tomorrow Night</option>
        <option value="prism-theme--twilight">Twilight</option>
        <option value="prism-theme--coy">Coy</option>
        <option value="prism-theme--solarized">Solarized Light</option>
        <option value="prism-theme--funky">Funky</option>
      </select>
    </div>
  `
})
