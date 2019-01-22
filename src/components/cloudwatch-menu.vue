<template>
  <div>
    cloudwatch
  </div>
</template>

<script>
  import cloneDeep from 'lodash/cloneDeep'

  function deepParse (objectToParse) {
    let obj
    try {
      obj = JSON.parse(objectToParse)
    } catch (e) {
      obj = objectToParse
    }
    for (const prop in obj) {
      console.log(prop, obj)

      if (obj.hasOwnProperty(prop)) {
        try {
          obj[prop] = JSON.parse(obj[prop])
        } catch (e) {
          // nm
        }

        if (typeof obj[prop] === 'object') {
          deepParse(obj[prop])
        }
      }
    }

    return obj
  }

  export default {
    name: 'CloudWatchMenu',
    created () {
      const observer = new MutationObserver(function(mutations) {

        // // prettifies json in sqs message modal
        const [...jsonElements] = document.querySelectorAll('.cwdb-log-viewer-table-row-header.expanded + .cwdb-log-viewer-table-row-details div.cwdb-json:not(.language-json)')

        if (jsonElements.length) {

          jsonElements.map(el => {
            const jsonObj = deepParse(el.innerText)
            console.log(jsonObj)

            el.innerHTML = `<pre><code>${JSON.stringify(jsonObj, null, 2)}</code></pre>`
            el.classList = ['language-json']
            el.parentElement.style.overflow = 'auto'
          })
          Prism.highlightAll()
        }


      });
      observer.observe(document.body, {attributes: true, childList: true, subtree: true})
    }
  }
</script>
