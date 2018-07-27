import angular from 'angular'
import config from './config'
import run from './run'
import './dashboard/main'

export default angular
  .module('app.pages', [
    'app.pages.dashboard',
  ])
  .config(config)
  .run(run)