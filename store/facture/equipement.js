export const state = () => ({
  factures: [],
})
export const getters = {
  factures: (state) => state.factures,
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get('api/finances/factures/equipements')
    commit('SET_FACTURE', requete.data.factures)
  },

  async getTrashAll({ commit }) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get('api/finances/factures/equipements/trashed')
    commit('SET_FACTURE', requete.data.factures)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/factures/equipements/' + id)
    return requete.data
  },

  async getPaginate({ commit }, page = 1) {
    const requete = await this.$axios.get(`api/finances/factures/equipements/paginate?page=${page}`)
    commit('SET_FACTURE', requete.data)
  },

  async getSearch({ commit }, payload) {
    const requete = await this.$axios.get(
      `api/finances/factures/equipements/search/${payload.search}/paginate?page=${payload.page}`
    )
    commit('SET_FACTURE', requete.data)
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/factures/equipements/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/finances/factures/equipements/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/finances/factures/equipements/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/factures/equipements/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_FACTURE(state, factures) {
    state.factures = factures
  },
}
