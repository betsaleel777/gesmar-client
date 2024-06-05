/* eslint-disable no-empty-pattern */
export const state = () => ({
  factures: [],
})
export const getters = {
  factures: (state) => state.factures,
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get('api/finances/factures/annexes')
    commit('SET_FACTURE', requete.data.factures)
  },

  async getTrashAll({ commit }) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get('api/finances/factures/annexes/trashed')
    commit('SET_FACTURE', requete.data.factures)
  },

  async getOne({}, id) {
    const requete = await this.$axios.get('api/finances/factures/annexes/' + id)
    return requete.data
  },

  async getPaginate({ commit }, page = 1) {
    const requete = await this.$axios.get(`api/finances/factures/annexes/paginate?page=${page}`)
    commit('SET_FACTURE', requete.data)
  },

  async getSearch({ commit }, payload) {
    const requete = await this.$axios.get(`api/finances/factures/annexes/search/${payload.search}/paginate?page=${payload.page}`)
    commit('SET_FACTURE', requete.data)
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/factures/annexes/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/finances/factures/annexes/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/finances/factures/annexes/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/factures/annexes/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_FACTURE(state, factures) {
    state.factures = factures
  },
}
