export const state = () => ({
  ouvertures: [],
})
export const getters = {
  ouvertures: (state) => {
    return state.ouvertures
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_OUVERTURE', [])
    const requete = await this.$axios.get('api/finances/caisses/ouvertures')
    commit('SET_OUVERTURE', requete.data.ouvertures)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/caisses/ouvertures/' + id)
    return requete.data
  },

  async getByCaissier({ commit }, id) {
    const requete = await this.$axios.get('api/finances/caisses/ouvertures/current/caissier/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/caisses/ouvertures/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/caisses/ouvertures/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ouvertureExists({ dispatch }, caissier) {
    const requete = await this.$axios.get('api/finances/caisses/ouvertures/exists/' + caissier)
    return Boolean(requete.data.exists)
  },
}

export const mutations = {
  SET_OUVERTURE(state, ouvertures) {
    state.ouvertures = ouvertures
  },
}
