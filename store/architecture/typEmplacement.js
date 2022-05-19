export const state = () => ({
  types: [],
})
export const getters = {
  types: (state) => {
    return state.types
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_TYPES', [])
    const requete = await this.$axios.get('api/parametres/emplacements/types')
    commit('SET_TYPES', requete.data.types)
  },
  async getTrashAll({ commit }) {
    commit('SET_TYPES', [])
    const requete = await this.$axios.get('api/parametres/emplacements/types/trashed')
    commit('SET_TYPES', requete.data.types)
  },
  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/emplacements/types/' + id)
    return requete.data
  },
  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put(
      'api/parametres/emplacements/types/' + payload.id,
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete(
      'api/parametres/emplacements/types/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.get(
      'api/parametres/emplacements/types/restore/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post(
      'api/parametres/emplacements/types/store',
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_TYPES(state, types) {
    state.types = types
  },
}
