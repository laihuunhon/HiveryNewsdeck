export default function run($rootScope) {
  'ngInject'

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    $rootScope.pageLoading = true
  })
  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
    $rootScope.pageLoading = false
  })
}