export const state = () => ({
  marches: [],
})
export const getters = {
  marches: (state) => {
    return state.marches
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_MARCHE', [])
    const requete = await this.$axios.get('api/parametres/marches')
    commit('SET_MARCHE', requete.data.marches)
  },
  async getTrashAll({ commit }) {
    commit('SET_MARCHE', [])
    const requete = await this.$axios.get('api/parametres/marches/trashed')
    commit('SET_MARCHE', requete.data.marches)
  },
  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/marches/' + id)
    return requete.data
  },
  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put(
      'api/parametres/marches/' + payload.id,
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/marches/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.get(
      'api/parametres/marches/restore/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post(
      'api/parametres/marches/store',
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async push({ dispatch }, payload) {
    const requete = await this.$axios.post(
      'api/parametres/marches/push',
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message, donnees: requete.data.marche }
  },
}

export const mutations = {
  SET_MARCHE(state, marches) {
    state.marches = marches
  },
}
