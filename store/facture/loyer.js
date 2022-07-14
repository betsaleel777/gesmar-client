export const state = () => ({
  factures: [],
})
export const getters = {
  factures: (state) => {
    return state.factures
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get('api/finances/factures/loyers')
    commit('SET_FACTURE', requete.data.factures)
  },
  async getTrashAll({ commit }) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get(
      'api/finances/factures/loyers/trashed'
    )
    commit('SET_FACTURE', requete.data.factures)
  },
  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/factures/loyers/' + id)
    return requete.data
  },
  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put(
      'api/finances/factures/loyers/' + payload.id,
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete(
      'api/finances/factures/loyers/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.get(
      'api/finances/factures/loyers/restore/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post(
      'api/finances/factures/loyers/store',
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_FACTURE(state, factures) {
    state.factures = factures
  },
}
