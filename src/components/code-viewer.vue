<template>
  <div>
    <template v-for="(code, id) in codeBlocks">
      <portal :target-el="id" :key="code">
        <div :class="prefs.theme">
          <pre :style="{'max-height': maxHeight}">
            <button class="fullscreen-toggle-button" @click="setFullscreenBlock(id)">Toggle Fullscreen</button>
            <code class="language-json"> {{code}} </code>
          </pre>
        </div>
      </portal>
    </template>

    <div :class="prefs.theme">
      <pre id="fullscreen-code-view" v-if="fullscreenBlock.id">
        <button class="fullscreen-toggle-button" @click="clearFullscreenBlock">Toggle Fullscreen</button>
        <code class="language-json"> {{ fullscreenBlock.code }} </code>
      </pre>
    </div>
  </div>
</template>

<script>
  import { deepParse } from '../utils'

  export default {
    name: 'CodeViewer',
    inject: ['prefs'],
    props: {
      selector: {
        type: String,
        required: true
      },
      maxHeight: {
        type: String,
        'default': '100%'
      }
    },
    data () {
      return {
        codeBlocks: {},
        fullscreenBlock: {},
      }
    },
    async created () {
      const observer = new MutationObserver(async (mutations) => {
        const [...jsonElements] = document.querySelectorAll(this.selector)

        const views = jsonElements.reduce((acc, el) => {
          if (!el.dataset.jsonViewerId) {
            const portal = document.createElement('div')
            const id = `json-view-${Math.floor(Math.random() * 100000)}`

            el.style.display = 'none'
            el.dataset.jsonViewerId = id
            portal.setAttribute('id', id)
            el.parentElement.append(portal)
          }

          let code = ""
          if (el.value && el.value.length) {
            code = JSON.stringify(deepParse(el.value), null, 2)
          } else {
            code = JSON.stringify(deepParse(el.innerText), null, 2)
          }

          if (code !== this.codeBlocks[`#${el.dataset.jsonViewerId}`]) {
            return { ...acc, [`#${el.dataset.jsonViewerId}`]: code }
          }
          return {...acc}

        }, {})
        this.$set(this, 'codeBlocks', {...this.codeBlocks, ...views})
        if (Object.keys(views).length) {
          await this.$nextTick()
          Prism.highlightAll()
        }
      })

      observer.observe(document.body, {attributes: true, childList: true, subtree: true})
    },
    computed: {
      isOnLambdaLogGroup () {
        return (/group\=\/aws\/lambda\//ig.exec(this.$route.hash) || []).length
      }
    },
    methods: {
      async setFullscreenBlock (id) {
        this.$set(this, 'fullscreenBlock', {id, code: this.codeBlocks[id]})
        await this.$nextTick()
        Prism.highlightAll()
      },
      async clearFullscreenBlock () {
        this.$set(this, 'fullscreenBlock', {id: null, code: null})
        await this.$nextTick()
        Prism.highlightAll()
      }
    }
  }
</script>

<style>


</style>
