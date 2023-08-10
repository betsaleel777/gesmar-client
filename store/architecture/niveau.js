export const state = () => ({
  niveaux: [],
})
export const getters = {
  niveaux: (state) => {
    return state.niveaux
  },
  niveauxBySites: (state) => (sites) => {
    const ids = sites.map((site) => site.id)
    return state.niveaux.filter((niveau) => ids.includes(niveau.site_id))
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_NIVEAUX', [])
    const requete = await this.$axios.get('api/parametres/niveaux')
    commit('SET_NIVEAUX', requete.data.niveaux)
  },

  async getSearch({ commit }, search) {
    const requete = await this.$axios.get('api/parametres/niveaux/select', { params: { search } })
    return requete.data
  },

  async getTrashAll({ commit }) {
    commit('SET_NIVEAUX', [])
    const requete = await this.$axios.get('api/parametres/niveaux/trashed')
    commit('SET_NIVEAUX', requete.data.niveaux)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/niveaux/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/niveaux/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/niveaux/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/niveaux/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/niveaux/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_NIVEAUX(state, niveaux) {
    state.niveaux = niveaux
  },
}
