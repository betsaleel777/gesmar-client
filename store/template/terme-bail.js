export const state = () => ({ termes: [] })
export const getters = {
  termes: (state) => state.termes,
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_TERMES', [])
    const requete = await this.$axios.get('api/parametres/termes/emplacements')
    commit('SET_TERMES', requete.data.termes)
  },

  async getTrashAll({ commit }) {
    commit('SET_TERMES', [])
    const requete = await this.$axios.get('api/parametres/termes/emplacements/trashed')
    commit('SET_TERMES', requete.data.termes)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/termes/emplacements/' + id)
    return requete.data
  },

  async getPdf({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/termes/emplacements/pdf/' + id)
    return { path: requete.data.path }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/termes/emplacements/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/termes/emplacements/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/termes/emplacements/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_TERMES(state, termes) {
    state.termes = termes
  },
}
