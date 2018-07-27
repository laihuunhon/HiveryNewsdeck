export default function credentials(config, $q) {
  'ngInject'
  return {
    request(req) {
      return req
    },
    responseError(res) {
      return $q.reject(res)
    }
  }
}