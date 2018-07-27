import angular from 'angular'
import 'bootstrap-less/bootstrap/index.less'
import 'angular-ui-bootstrap'
import 'angular-ui-router'
import 'angular-resource'
import 'angular-drag-and-drop-lists'

import appConfig from './config'

import '../public/less/index.less'

import './services/main'
import './resources/main'
import './components/main'
import './pages/main'

export default angular
  .module('app', [
    'ui.bootstrap',
    'ui.router',
    'ngResource',
    'dndLists',
    'app.resources',
    'app.services',
    'app.components',
    'app.pages'
  ])
  .constant('config', appConfig['development'])

export const bootstrap = () => angular.bootstrap(document, ['app'])
