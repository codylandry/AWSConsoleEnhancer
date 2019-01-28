<template>
  <div>
    <button v-if="isOnLambdaPage" @click="goToCloudWatchInsights">CloudWatch Insights</button>
    <code-viewer selector="#execution-result > textarea" v-if="testWindowOpen" max-height="300px"></code-viewer>
  </div>
</template>

<script>
  import CodeViewer from './code-viewer'
  export default {
    name: 'LambdaMenu',
    components: {
      CodeViewer
    },
    data () {
      return {
        testWindowOpen: false
      } // .awsui-textarea.awsui-textarea-readonly
    },
    watch: {
      $route: {
        deep: true,
        immediate: true,
        async handler () {
          await this.$nextTick()
          const observer = new MutationObserver(async (mutations) => {
            const testResultWindow = document.querySelector('.overlay-container.execution-results')
            const textarea = testResultWindow.querySelector('#execution-result > textarea')
            if (textarea.value && textarea.value.length) {
              this.testWindowOpen = true
            } else {
              this.testWindowOpen = false
            }
          })
          observer.observe(document.body, {attributes: true, childList: true, subtree: true})
        }
      }
    },
    computed: {
      isOnLambdaPage () {
        return this.$route.hash.startsWith('#/functions/')
      }
    },
    methods: {
      goToCloudWatchInsights () {
        const url = "https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs-insights:queryDetail=~(end~0~start~-900~timeType~'RELATIVE~unit~'seconds~editorString~'fields*20*20*40timestamp*2c*20*40message*0a*20*7c*20limit*2020~isLiveTail~false~queryId~'CW_LOG_NAME~source~'CW_LOG_NAME)";
        const logGroupFromCloudwatch = /.*group=([^;]*?)(;|$)/;
        const logGroupFromLambda = /.*functions\/([^?]*)/;
        const logGroupToken = /CW_LOG_NAME/g;

        let logGroup = null;

        const cloudwatchResult = logGroupFromCloudwatch.exec(window.location.href);
        const lambdaResult     = logGroupFromLambda.exec(window.location.href);

        if (cloudwatchResult) {
          logGroup = cloudwatchResult[1];
        }
        else if (lambdaResult) {
          logGroup = `/aws/lambda/${lambdaResult[1]}`;
        }

        if (!logGroup) {
          alert("Could not find log group information on this page. Are you on a Lambda or Cloudwatch group/stream page?");
          return;
        }

        window.open(url.replace(logGroupToken, logGroup), "_blank");
      }
    }
  }
</script>


