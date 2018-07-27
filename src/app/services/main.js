import angular from 'angular'
import news from './news'

angular
  .module('app.services', [])
  .factory('NewsService', news)

