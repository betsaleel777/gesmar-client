export const state = () => ({
  fermetures: [],
  fermeture: null,
})
export const getters = {
  fermetures: (state) => state.fermetures,
  fermeture: (state) => state.fermeture,
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_FERMETURES', [])
    const requete = await this.$axios.get('api/finances/caisses/fermetures')
    commit('SET_FERMETURES', requete.data.fermetures)
  },

  async getPaginate({ commit }, page = 1) {
    const requete = await this.$axios.get(`api/finances/caisses/fermetures/paginate?page=${page}`)
    commit('SET_FERMETURES', requete.data)
  },

  async getSearch({ commit }, payload) {
    const requete = await this.$axios.get(
      `api/finances/caisses/fermetures/search/${payload.search}/paginate?page=${payload.page}`
    )
    commit('SET_FERMETURES', requete.data)
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
