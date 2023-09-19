export const state = () => ({
  attributions: [],
  emplacements: [],
})

export const getters = {
  attributions: (state) => {
    return state.attributions
  },
  emplacements: (state) => {
    return state.emplacements
  },
}

export const actions = {
  async getAll({ commit }) {
    commit('SET_ATTRIBUTION', [])
    const requete = await this.$axios.get('api/finances/attributions')
    commit('SET_ATTRIBUTION', requete.data)
  },

  async getPaginate({ commit }, page = 1) {
    const requete = await this.$axios.get(`api/finances/attributions/paginate?page=${page}`)
    commit('SET_ATTRIBUTION', requete.data)
  },

  async getSearch({ commit }, payload) {
    const requete = await this.$axios.get(
      `api/finances/attributions/search/${payload.search}/paginate?page=${payload.page}`
    )
    commit('SET_ATTRIBUTION', requete.data)
  },

  async getAllWithBorderau({ commit }) {
    commit('SET_ATTRIBUTION', [])
    const requete = await this.$axios.get('api/finances/attributions/with-bordereau')
    commit('SET_ATTRIBUTION', requete.data.attributions)
  },

  async getTrashAll({ commit }) {
    commit('SET_ATTRIBUTION', [])
    const requete = await this.$axios.get('api/finances/attributions/trashed')
    commit('SET_ATTRIBUTION', requete.data.attributions)
  },

  async getAllAttribuated({ commit }, payload) {
    commit('SET_EMPLACEMENT', [])
    const requete = await this.$axios.get(
      `api/finances/attributions/attribuated/${payload.date}/${payload.commercial}`
    )
    commit('SET_EMPLACEMENT', requete.data.emplacements)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/attributions/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/attributions/' + payload.id, payload)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/finances/attributions/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/finances/attributions/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/attributions/store', payload)
    return { message: requete.data.message }
  },

  async transferer({ dispatch }, payload) {
    const requete = await this.$axios.patch('api/finances/attributions/transferer/' + payload.id, payload)
    dispatch('finance/commercial/getAll', {}, { root: true })
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_ATTRIBUTION(state, attributions) {
    state.attributions = attributions
  },
  SET_EMPLACEMENT(state, emplacements) {
    state.emplacements = emplacements
  },
}
