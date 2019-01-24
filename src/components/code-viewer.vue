<template>
  <div>
    <template v-for="(code, id) in codeBlocks">
      <portal :target-el="id">
        <pre class="language-json">
          <button class="fullscreen-toggle-button" @click="setFullscreenBlock(id)">Toggle Fullscreen</button>
          <code> {{code}} </code>
        </pre>
      </portal>
    </template>

    <pre class="language-json" id="fullscreen-code-view" v-if="fullscreenBlock.id">
      <button class="fullscreen-toggle-button" @click="clearFullscreenBlock">Toggle Fullscreen</button>
      <code> {{ fullscreenBlock.code }} </code>
    </pre>
  </div>
</template>

<script>
  import { deepParse } from '../utils'

  export default {
    name: 'CodeViewer',
    props: {
      selector: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        codeBlocks: {},
        fullscreenBlock: {}
      }
    },
    async created () {
      const observer = new MutationObserver(async (mutations) => {

        const [...jsonElements] = document.querySelectorAll(this.selector)

        const views = jsonElements.reduce((acc, el) => {
          const code = JSON.stringify(deepParse(el.innerText), null, 2)
          const portal = document.createElement('div')
          const id = `json-view-${Math.floor(Math.random() * 100000)}`
          portal.setAttribute('id', id)
          el.replaceWith(portal)

          return { ...acc, [`#${id}`]: code }
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
