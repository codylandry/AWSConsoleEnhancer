
import Vue from 'vue'
const PREFS_KEY = 'AWS_CONSOLE_ENHANCER_PREFS'

const defaultPrefs = {
  theme: 'prism-theme--okaida'
}
const initialPrefs = JSON.parse(localStorage.getItem(PREFS_KEY)) || defaultPrefs

export const popup = new Vue({
  provide() {
    return {
      prefs: this.prefs
    }
  },
  name: 'App',
  el: '#app',
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
        chrome.tabs.query({currentWindow: true, active: true}, ([tab]) => {
          chrome.tabs.sendMessage(tab.id, val)
        })
      }
    }
  },
  template: `
    <div style="width:300px">
      <h4>AWS Console Enhancer</h4>
      <div style="color: black; display: flex; justify-content: flex-end;align-items:center;">
        <span for="theme-selector">Theme:</span>
        <select id="theme-selector" v-model="prefs.theme" style="height: 22px; margin: 0 0 0 10px;">
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
    </div>
  `
})
