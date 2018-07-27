import angular from 'angular'
import news from './news'

export default angular
  .module('app.resources', [])
  .factory('NewsResource', news)

