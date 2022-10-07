import Vue from 'vue'

export default () => {
  Vue.filter('currency', function (value) {
    const formatter = new Intl.NumberFormat('pt-GW')
    return formatter.format(Number(value)) + ' FCFA'
  })
}
