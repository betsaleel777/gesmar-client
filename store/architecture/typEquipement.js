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
    const requete = await this.$axios.get('api/parametres/equipement/types')
    commit('SET_TYPES', requete.data.types)
  },
  async getTrashAll({ commit }) {
    commit('SET_TYPES', [])
    const requete = await this.$axios.get(
      'api/parametres/equipement/types/trashed'
    )
    commit('SET_TYPES', requete.data.types)
  },
  async getOne({ commit }, id) {
    const requete = await this.$axios.get(
      'api/parametres/equipement/types/' + id
    )
    return requete.data
  },
  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put(
      'api/parametres/equipement/types/' + payload.id,
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete(
      'api/parametres/equipement/types/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.get(
      'api/parametres/equipement/types/restore/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post(
      'api/parametres/equipement/types/store',
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message, id: requete.data.id }
  },
}

export const mutations = {
  SET_TYPES(state, types) {
    state.types = types
  },
}
