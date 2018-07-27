import controller from './controller'
import template from './template.html'

export default function config($stateProvider) {
  'ngInject'
  $stateProvider.state('app.dashboard', {
    url: 'dashboard',
    controller,
    controllerAs: 'ctrl',
    template,
    resolve: {
      restoreArrangement: (NewsService) => {
        return NewsService.restoreArrangementList()
      },
      newspapersList: (NewsService) => {
        return NewsService.getNewspapers()
      },
      arrangementData: (NewsService) => {
        return NewsService.getCurrentArrangement()
      }
    }
  })
}