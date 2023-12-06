export const state = () => ({
  encaissements: []
})
export const getters = {
  encaissements: (state) => {
    return state.encaissements
  }
}
export const actions = {
  async getAll({ commit }) {
    const requete = await this.$axios.get('api/finances/caisses/encaissements')
    commit('SET_ENCAISSEMENT', requete.data.encaissements)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/caisses/encaissements/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/caisses/encaissements/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/caisses/encaissements/store', payload)
    dispatch('getAll')
    dispatch('exploitation/ordonnancement/getAllUnpaid', {}, { root: true })
    return { message: requete.data.message }
  }
}

export const mutations = {
  SET_ENCAISSEMENT(state, encaissements) {
    state.encaissements = encaissements
  }
}
