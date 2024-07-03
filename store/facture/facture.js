import { FACTURE } from '~/helper/constantes'
export const state = () => ({
  factures: [],
})
export const getters = {
  factures: (state) => state.factures,
  soldees: (state) => state.factures.filter((facture) => facture.status === FACTURE.status.paid),
}
export const actions = {
  async getAll({ commit }) {
    const requete = await this.$axios.get('api/finances/factures')
    commit('SET_FACTURE', requete.data.factures)
  },

  async getSoldeesPaginate({ commit }, page = 1) {
    const requete = await this.$axios.get(`api/finances/factures/soldees/paginate?page=${page}`)
    commit('SET_FACTURE', requete.data)
  },

  async getPersonnePaginate({ commit }, payload) {
    const requete = await this.$axios.get(`api/finances/factures/personne/${payload.id}/paginate?page=${payload.page}`)
    commit('SET_FACTURE', requete.data)
  },

  async getSoldeesSearch({ commit }, payload) {
    const requete = await this.$axios.get(`api/finances/factures/soldees/search/${payload.search}/paginate?page=${payload.page}`)
    commit('SET_FACTURE', requete.data)
  },

  async getPersonneSearch({ commit }, payload) {
    const requete = await this.$axios.get(`api/finances/factures/personne/${payload.id}/search/${payload.search}/paginate?page=${payload.page}`)
    commit('SET_FACTURE', requete.data)
  },

  async getfacturesForScheduleView({ commit }) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get(`api/finances/factures/scheduling`)
    commit('SET_FACTURE', requete.data.factures)
  },

  async getTrashAll({ commit }) {
    commit('SET_FACTURE', [])
    const requete = await this.$axios.get('api/finances/factures/trashed')
    commit('SET_FACTURE', requete.data.factures)
  },

  async getByMarche({ commit }, id) {
    const requete = await this.$axios.get('api/finances/factures/marche/' + id)
    return requete.data
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/factures/' + id)
    return requete.data
  },

  async getByContrat({ commit }, id) {
    const requete = await this.$axios.get(`api/finances/factures/contrat/${id}`)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/factures/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/finances/factures/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/finances/factures/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/factures/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_FACTURE(state, factures) {
    state.factures = factures
  },
}
