export const state = () => ({
  banques: [],
})
export const getters = {
  banques: (state) => {
    return state.banques
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_BANQUE', [])
    const requete = await this.$axios.get('api/parametres/banques')
    commit('SET_BANQUE', requete.data.banques)
  },

  async getTrashAll({ commit }) {
    commit('SET_BANQUE', [])
    const requete = await this.$axios.get('api/parametres/banques/trashed')
    commit('SET_BANQUE', requete.data.banques)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/banques/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/banques/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/banques/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/banques/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/banques/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_BANQUE(state, banques) {
    state.banques = banques
  },
}
