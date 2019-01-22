import VueRouter from 'vue-router'
import LambdaMenu from './components/lambda-menu'
import SqsMenu from './components/sqs-menu'

const routes = [
  { path: '/lambda/*', component: LambdaMenu },
  { path: '/sqs/*', component: SqsMenu }
]

export default new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})
