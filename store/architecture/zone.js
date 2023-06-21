export const state = () => ({
  zones: [],
})
export const getters = {
  zones: (state) => {
    return state.zones
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_ZONE', [])
    const requete = await this.$axios.get('api/parametres/zones')
    commit('SET_ZONE', requete.data.zones)
  },

  async getSearch({ commit }, search) {
    const requete = await this.$axios.get('api/parametres/zones/select', { params: { search } })
    return requete.data
  },

  async getTrashAll({ commit }) {
    commit('SET_ZONE', [])
    const requete = await this.$axios.get('api/parametres/zones/trashed')
    commit('SET_ZONE', requete.data.zones)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/zones/' + id)
    return requete.data
  },

  async getByMarche({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/zones/marche/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/zones/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/zones/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/zones/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/zones/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_ZONE(state, zones) {
    state.zones = zones
  },
}
