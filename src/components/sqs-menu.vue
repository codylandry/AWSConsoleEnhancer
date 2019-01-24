<template>
  <div>
    <code-viewer selector=".gwt-TabLayoutPanelContent pre:not(.language-json)"></code-viewer>
  </div>
</template>

<script>
  import CodeViewer from './code-viewer'

  export default {
    name: 'SqsMenu',
    components: {CodeViewer},
  }
</script>
