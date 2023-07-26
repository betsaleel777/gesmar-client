import Vue from 'vue'
import VueGates from 'vue-gates'
import { SUPERROLE } from '~/helper/constantes'
Vue.use(VueGates, {
  superRole: SUPERROLE,
  persistent: true,
})

export default (_context, inject) => {
  inject('gates', Vue.prototype.$gates)
}
