export default function formatNumber() {
  'ngInject'
  return (val) => {
    return parseInt(val*100)/100;
  }
}