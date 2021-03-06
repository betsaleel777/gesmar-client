export const state = () => ({
  abonnements: [],
})
export const getters = {
  abonnements: (state) => {
    return state.abonnements
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_ABONNEMENT', [])
    const requete = await this.$axios.get('api/parametres/abonnements')
    commit('SET_ABONNEMENT', requete.data.abonnements)
  },
  async getTrashAll({ commit }) {
    commit('SET_ABONNEMENT', [])
    const requete = await this.$axios.get('api/parametres/abonnements/trashed')
    commit('SET_ABONNEMENT', requete.data.abonnements)
  },
  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/abonnements/' + id)
    return requete.data
  },
  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put(
      'api/parametres/abonnements/' + payload.id,
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async resilier({ dispatch }, payload) {
    const requete = await this.$axios.put(
      'api/parametres/abonnements/finished/' + payload.id,
      payload
    )
    dispatch('getAll')
    dispatch('architecture/equipement/getAll', {}, { root: true })
    return { message: requete.data.message }
  },
  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/abonnements/' + id)
    dispatch('getAll')
    dispatch('architecture/equipement/getAll', {}, { root: true })
    return { message: requete.data.message }
  },
  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.get(
      'api/parametres/abonnements/restore/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post(
      'api/parametres/abonnements/store',
      payload
    )
    dispatch('getAll')
    dispatch('architecture/equipement/getAll', {}, { root: true })
    return { message: requete.data.message }
  },
  async getLastIndex({ commit }, id) {
    const requete = await this.$axios.get(
      'api/parametres/abonnements/indexing/' + id
    )
    return { index: requete.data.index }
  },
}

export const mutations = {
  SET_ABONNEMENT(state, abonnements) {
    state.abonnements = abonnements
  },
}
