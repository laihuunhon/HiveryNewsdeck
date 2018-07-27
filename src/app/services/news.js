export default function NewsService(NewsResource) {
  'ngInject'

  return {
    arrangementList: [],
    storeArrangement(arrangement) {
      this.arrangementList.push(arrangement);
      localStorage['arrangementList'] = JSON.stringify(this.arrangementList)
    },
    restoreArrangementList() {
      if (localStorage['arrangementList']) {
        this.arrangementList = JSON.parse(localStorage['arrangementList'])
      }
      return this.arrangementList
    },
    getNewspapers() {
      return NewsResource.getNewspapers().$promise
    },
    getCurrentArrangement() {
      return NewsResource.getCurrentArrangement().$promise
    },
    getPredictedSales(params) {
      return NewsResource.getPredictedSales(params).$promise
    },
  }
}