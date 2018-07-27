export default class DashboardController {
  constructor(newspapersList, arrangementData, $scope, NewsService) {
    'ngInject'
    const currentArrangement = arrangementData.arrangement
    const predictedSales = arrangementData.predicted_sales

    Object.assign(this, {newspapersList, arrangementData, currentArrangement, predictedSales, NewsService})

    this.init()    

    $scope.dropCallback = function(index, item, external, type) {
      // Return false here to cancel drop. Return true if you insert the item yourself.
      const updateIndex = Object.keys(newspapersList).find(key => newspapersList[key].name === item.name)
      currentArrangement[index-1].newspaper_id = parseInt(updateIndex);
      
      return true;
    };

    $scope.$watch(() => currentArrangement, (newVal, oldVal) => {
      if (angular.equals(newVal, oldVal)) return;
      
      this.buildArrangementIndex();
      this.calculateTotalPrices();
      this.getPredictedSales();
    }, true)
  }
  init() {
    this.totalPrices = 0
    this.calculateTotalPrices()
    this.originalArrangement = []
    angular.copy(this.currentArrangement, this.originalArrangement)
    this.originalPredictedSales = this.predictedSales
    this.buildArrangementIndex();
    this.NewsService.storeArrangement({
      key: this.arrangementIndex,
      predictedSales: this.predictedSales
    })
  }
  calculateTotalPrices() {
    this.totalPrices =  Object.keys(this.currentArrangement).reduce((acc, i) => {
      const newspaperId = this.currentArrangement[i].newspaper_id
      acc += this.newspapersList[newspaperId].price

      return acc
    }, 0)
  }
  buildArrangementIndex() {
    this.arrangementIndex = Object.keys(this.currentArrangement).reduce((acc, i) => {
      const newspaperId = this.currentArrangement[i].newspaper_id
      acc.push(newspaperId)

      return acc
    }, [])
  }
  getPredictedSales() {
    const filterArrangement = this.NewsService.arrangementList.filter(item => item.key.join(',') === this.arrangementIndex.join(','))[0]
  
    if (filterArrangement) {
      this.predictedSales = filterArrangement.predictedSales
      this.calculateDiff()
    } else {
      this.NewsService.getPredictedSales({
        arrangement: this.arrangementIndex.join(',')
      }).then(result => {
        this.predictedSales = result.predicted_sales
        this.NewsService.storeArrangement({
          key: this.arrangementIndex,
          predictedSales: result.predicted_sales
        })
        this.calculateDiff()
      })
    }
  }
  resetArrangement() {
    angular.copy(this.originalArrangement, this.currentArrangement)
  }
  calculateDiff() {
    this.diff = parseInt((this.predictedSales - this.originalPredictedSales)*100)/100
  }
  isChange(item) {
    if (this.originalArrangement[item.cell_number-1].newspaper_id !== item.newspaper_id) {
      return true
    }
    return false
  }
  getBestArrangement() {
    const bestArrangement = this.NewsService.arrangementList.reduce((prev, current) => {
      return (prev.predictedSales > current.predictedSales) ? prev : current
    });
    const arrangement = []
    bestArrangement.key.forEach((item, index) => {
      arrangement.push({
        cell_number: index + 1,
        newspaper_id: item
      })
    })
    angular.copy(arrangement, this.currentArrangement)
  }
  submit() {
    alert('Your newsdeck has been updated.')
  }
}