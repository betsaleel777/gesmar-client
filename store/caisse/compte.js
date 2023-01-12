export const state = () => ({
  comptes: [],
})
export const getters = {
  comptes: (state) => {
    return state.comptes
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_COMPTE', [])
    const requete = await this.$axios.get('api/parametres/comptes')
    commit('SET_COMPTE', requete.data.comptes)
  },

  async getTrashAll({ commit }) {
    commit('SET_COMPTE', [])
    const requete = await this.$axios.get('api/parametres/comptes/trashed')
    commit('SET_COMPTE', requete.data.comptes)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/comptes/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/comptes/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/comptes/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/comptes/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/comptes/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_COMPTE(state, comptes) {
    state.comptes = comptes
  },
}
