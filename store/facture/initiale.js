export const state = () => ({
  factures: [],
})

export const getters = {
  factures: (state) => state.factures,
}

export const actions = {
  async getAll({ commit }) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get('api/finances/factures/initiales')
    commit('SET_FACTURE', requete.data.factures)
  },

  async getTrashAll({ commit }) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get('api/finances/factures/initiales/trashed')
    commit('SET_FACTURE', requete.data.factures)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/factures/initiales/' + id)
    return requete.data
  },

  async getPaginate({ commit }, page = 1) {
    const requete = await this.$axios.get(`api/finances/factures/initiales/paginate?page=${page}`)
    commit('SET_FACTURE', requete.data)
  },

  async getSearch({ commit }, payload) {
    const requete = await this.$axios.get(
      `api/finances/factures/initiales/search/${payload.search}/paginate?page=${payload.page}`
    )
    commit('SET_FACTURE', requete.data)
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/factures/initiales/' + payload.id, payload)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/finances/factures/initiales/' + id)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/finances/factures/initiales/restore/' + id)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/factures/initiales/store', payload)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_FACTURE(state, factures) {
    state.factures = factures
  },
}
