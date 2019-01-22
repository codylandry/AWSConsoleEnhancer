<template>
  <div>
    sqs route
  </div>
</template>

<script>
  import {deepParse} from '../utils'

  export default {
    name: 'SqsMenu',
    created () {
      const observer = new MutationObserver(function(mutations) {

        // prettifies json in sqs message modal
        const pre = document.querySelector('pre')
        if (pre) {
          pre.innerHTML = `
            <code>
              ${JSON.stringify(deepParse(pre.innerText), null, 2)}
            </code>`
          pre.classList = ['language-json']
          pre.parentElement.style.overflow = 'auto'

          const fullscreenToggleButton = document.createElement('button')
          fullscreenToggleButton.innerText = 'Toggle Fullscreen'
          fullscreenToggleButton.classList.add('fullscreen-toggle-button')
          fullscreenToggleButton.addEventListener('click', () => pre.classList.toggle('fullscreen-code'))

          pre.appendChild(fullscreenToggleButton)
        }

        Prism.highlightAll()

      });
      observer.observe(document.body, {childList: true})
    }
  }
</script>
