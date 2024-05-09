import Vue from 'vue'
Vue.filter('money', function (value) {
  const formatter = new Intl.NumberFormat('pt-GW')
  return formatter.format(Number(value))
})
