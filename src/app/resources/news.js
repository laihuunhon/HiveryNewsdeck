export default function NewsResource($resource, config) {
  'ngInject'

  return $resource('/hivery', {}, {
    getNewspapers: {
      url: `/hivery/newspapers`,
      method: 'GET'
    },
    getCurrentArrangement: {
      url: `/hivery/current_arrangement`,
      method: 'GET'
    },
    getPredictedSales: {
      url: `/hivery/get_predicted_sales`,
      method: 'GET'
    }
  })
}