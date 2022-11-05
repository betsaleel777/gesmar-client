export const state = () => ({
  guichets: [],
})
export const getters = {
  guichets: (state) => {
    return state.guichets
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_GUICHET', [])
    const requete = await this.$axios.get('api/parametres/guichets')
    commit('SET_GUICHET', requete.data.guichets)
  },

  async getTrashAll({ commit }) {
    commit('SET_GUICHET', [])
    const requete = await this.$axios.get('api/parametres/guichets/trashed')
    commit('SET_GUICHET', requete.data.guichets)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/guichets/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('parametre/guichets/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/guichets/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/guichets/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/guichets/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async push({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/guichets/push', payload)
    dispatch('getAll')
    return { message: requete.data.message, donnees: requete.data.guichets }
  },
}

export const mutations = {
  SET_GUICHET(state, guichets) {
    state.guichets = guichets
  },
}
