export const state = () => ({
  emplacements: [],
})
export const getters = {
  emplacements: (state) => {
    return state.emplacements
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_EMPLACEMENT', [])
    const requete = await this.$axios.get('api/parametres/emplacements')
    commit('SET_EMPLACEMENT', requete.data.emplacements)
  },
  async getTrashAll({ commit }) {
    commit('SET_EMPLACEMENT', [])
    const requete = await this.$axios.get('api/parametres/emplacements/trashed')
    commit('SET_EMPLACEMENT', requete.data.emplacements)
  },
  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/emplacements/' + id)
    return requete.data
  },
  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put(
      'parametre/emplacements/' + payload.id,
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete(
      'api/parametres/emplacements/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.get(
      'api/parametres/emplacements/restore/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post(
      'api/parametres/emplacements/store',
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_EMPLACEMENT(state, emplacements) {
    state.emplacements = emplacements
  },
}
