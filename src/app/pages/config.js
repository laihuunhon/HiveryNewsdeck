import CredentialsInterceptor from './CredentialsInterceptor'

export default function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $qProvider) {
  'ngInject'
  $urlRouterProvider.when('/', '/dashboard')

  $qProvider.errorOnUnhandledRejections(false)
  $stateProvider.state('app', {
    url: '/',
    template: `<ui-view></ui-view>`,
  })
  $locationProvider.html5Mode(true)

  $httpProvider.interceptors.push(CredentialsInterceptor)
}