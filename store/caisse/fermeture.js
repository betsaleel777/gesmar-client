export const state = () => ({
  fermetures: [],
  fermeture: null,
})
export const getters = {
  fermetures: (state) => {
    return state.fermetures
  },
  fermeture: (state) => {
    return state.fermeture
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_FERMETURES', [])
    const requete = await this.$axios.get('api/finances/caisses/fermetures')
    commit('SET_FERMETURES', requete.data.fermetures)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/caisses/fermetures/' + id)
    commit('SET_FERMETURE', requete.data.fermeture)
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/caisses/fermetures/store', payload)
    dispatch('caisse/encaissement/getAll', {}, { root: true })
    return requete.data
  },
}

export const mutations = {
  SET_FERMETURES(state, fermetures) {
    state.fermetures = fermetures
  },
  SET_FERMETURE(state, fermeture) {
    state.fermeture = fermeture
  },
}
