export const state = () => ({
  niveaux: [],
})
export const getters = {
  niveaux: (state) => {
    return state.niveaux
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_NIVEAUX', [])
    const requete = await this.$axios.get('api/parametres/niveaux')
    commit('SET_NIVEAUX', requete.data.niveaux)
  },

  async getTrashAll({ commit }) {
    commit('SET_NIVEAUX', [])
    const requete = await this.$axios.get('api/parametres/niveaux/trashed')
    commit('SET_NIVEAUX', requete.data.niveaux)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/niveaux/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/niveaux/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/niveaux/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/niveaux/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/niveaux/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async push({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/niveaux/push', payload)
    dispatch('getAll')
    return { message: requete.data.message, donnees: requete.data.niveaux }
  },
}

export const mutations = {
  SET_NIVEAUX(state, niveaux) {
    state.niveaux = niveaux
  },
}
