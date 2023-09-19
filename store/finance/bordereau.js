export const state = () => ({
  bordereaux: [],
})
export const getters = {
  bordereaux: (state) => {
    return state.bordereaux
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_BORDEREAU', [])
    const requete = await this.$axios.get('api/finances/bordereaux')
    commit('SET_BORDEREAU', requete.data.bordereaux)
  },

  async getTrashAll({ commit }) {
    commit('SET_BORDEREAU', [])
    const requete = await this.$axios.get('api/finances/bordereaux/trashed')
    commit('SET_BORDEREAU', requete.data.bordereaux)
  },

  async getPaginate({ commit }, page = 1) {
    const requete = await this.$axios.get(`api/finances/bordereaux/paginate?page=${page}`)
    commit('SET_BORDEREAU', requete.data)
  },

  async getSearch({ commit }, payload) {
    const requete = await this.$axios.get(
      `api/finances/bordereaux/search/${payload.search}/paginate?page=${payload.page}`
    )
    commit('SET_BORDEREAU', requete.data)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/bordereaux/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/bordereaux/' + payload.id, payload)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/finances/bordereaux/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/finances/bordereaux/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/bordereaux/store', payload)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_BORDEREAU(state, bordereaux) {
    state.bordereaux = bordereaux
  },
}
