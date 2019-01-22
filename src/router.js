import VueRouter from 'vue-router'
import LambdaMenu from './components/lambda-menu'
import SqsMenu from './components/sqs-menu'
import CloudWatchMenu from './components/cloudwatch-menu'

const routes = [
  { path: '/lambda/*', component: LambdaMenu },
  { path: '/sqs/*', component: SqsMenu },
  { path: '/cloudwatch/*', component: CloudWatchMenu },
]

export default new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})
