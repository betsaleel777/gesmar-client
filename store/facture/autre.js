export const state = () => ({
  factures: [],
})

export const getters = {
  factures: (state) => state.factures,
}

export const actions = {
  async getAll({ commit }, type) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get(`api/finances/factures/autres`, { params: { type } })
    commit('SET_FACTURE', requete.data.factures)
  },

  async getOne(_, payload) {
    const requete = await this.$axios.get('api/finances/factures/autres/show', { params: payload })
    return requete.data
  },

  async getPaginate({ commit }, payload) {
    payload.page = 1
    const requete = await this.$axios.get(`api/finances/factures/autres/paginate`, { params: payload })
    commit('SET_FACTURE', requete.data)
  },

  async getSearch({ commit }, payload) {
    const requete = await this.$axios.get(`api/finances/factures/autres/search/paginate`, { params: payload })
    commit('SET_FACTURE', requete.data)
  },
}

export const mutations = {
  SET_FACTURE(state, factures) {
    state.factures = factures
  },
}
