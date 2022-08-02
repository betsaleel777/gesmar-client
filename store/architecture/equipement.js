export const state = () => ({
  equipements: [],
})
export const getters = {
  equipements: (state) => {
    return state.equipements
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_EQUIPEMENT', [])
    const requete = await this.$axios.get('api/parametres/equipements')
    commit('SET_EQUIPEMENT', requete.data.equipements)
  },
  async getAllFromTypes({ commit }, payload) {
    commit('SET_EQUIPEMENT', [])
    const requete = await this.$axios.post(
      'api/parametres/equipements/types',
      payload
    )
    commit('SET_EQUIPEMENT', requete.data.equipements)
  },
  async getTrashAll({ commit }) {
    commit('SET_EQUIPEMENT', [])
    const requete = await this.$axios.get('api/parametres/equipements/trashed')
    commit('SET_EQUIPEMENT', requete.data.equipements)
  },
  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/equipements/' + id)
    return requete.data
  },
  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put(
      'api/parametres/equipements/' + payload.id,
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/equipements/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.get(
      'api/parametres/equipements/restore/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post(
      'api/parametres/equipements/store',
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_EQUIPEMENT(state, equipements) {
    state.equipements = equipements
  },
}
