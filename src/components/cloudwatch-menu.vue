<template>
  <div>
    <button v-if="isOnLambdaLogGroup" @click="goToCloudWatchInsights">CloudWatch Insights</button>
    <code-viewer selector="div.cwdb-json:not(.language-json)"></code-viewer>
  </div>
</template>

<script>
  import CodeViewer from './code-viewer'

  export default {
    name: 'CloudWatchMenu',
    components: {CodeViewer},
    data () {
      return {
        codeBlocks: {},
        fullscreenBlock: {}
      }
    },
    computed: {
      isOnLambdaLogGroup () {
        return (/group\=\/aws\/lambda\//ig.exec(this.$route.hash) || []).length
      }
    },
    methods: {
      goToCloudWatchInsights () {
        const url = 'https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs-insights:queryDetail=~(end~0~start~-900~timeType~\'RELATIVE~unit~\'seconds~editorString~\'fields*20*20*40timestamp*2c*20*40message*0a*20*7c*20limit*2020~isLiveTail~false~queryId~\'CW_LOG_NAME~source~\'CW_LOG_NAME)'
        const logGroupFromCloudwatch = /.*group=([^;]*?)(;|$)/
        const logGroupFromLambda = /.*functions\/([^?]*)/
        const logGroupToken = /CW_LOG_NAME/g

        let logGroup = null

        const cloudwatchResult = logGroupFromCloudwatch.exec(window.location.href)
        const lambdaResult = logGroupFromLambda.exec(window.location.href)

        if (cloudwatchResult) {
          logGroup = cloudwatchResult[1]
        } else if (lambdaResult) {
          logGroup = `/aws/lambda/${lambdaResult[1]}`
        }

        if (!logGroup) {
          alert('Could not find log group information on this page. Are you on a Lambda or Cloudwatch group/stream page?')
          return
        }

        window.open(url.replace(logGroupToken, logGroup), '_blank')
      }
    }
  }
</script>

<style>


</style>
