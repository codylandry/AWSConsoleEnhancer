<template>
  <div>
    sqs route
  </div>
</template>

<script>
  export default {
    name: 'SqsMenu',
    created () {
      const observer = new MutationObserver(function(mutations) {

        // prettifies json in sqs message modal
        const pre = document.querySelector('pre')
        if (pre) {
          pre.innerHTML = `<code>${JSON.stringify(JSON.parse(pre.innerText), null, 2)}</code>`
          pre.classList = [...pre.classList, 'language-json']
          pre.parentElement.style.overflow = 'auto'
        }

        Prism.highlightAll()

      });
      observer.observe(document.body, {childList: true})
    }
  }
</script>
