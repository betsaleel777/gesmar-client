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
    const requete = await this.$axios.get('api/exploitations/finances/bordereaux')
    commit('SET_BORDEREAU', requete.data.bordereaux)
  },

  async getTrashAll({ commit }) {
    commit('SET_BORDEREAU', [])
    const requete = await this.$axios.get('api/exploitations/finances/bordereaux/trashed')
    commit('SET_BORDEREAU', requete.data.bordereaux)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/exploitations/finances/bordereaux/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/exploitations/finances/bordereaux/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/exploitations/finances/bordereaux/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/exploitations/finances/bordereaux/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/exploitations/finances/bordereaux/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_BORDEREAU(state, bordereaux) {
    state.bordereaux = bordereaux
  },
}
