export const state = () => ({
  caissiers: [],
})

export const getters = {
  caissiers: (state) => {
    return state.caissiers
  },
}

export const actions = {
  async getAll({ commit }) {
    commit('SET_CAISSIER', [])
    const requete = await this.$axios.get('api/parametres/caissiers')
    commit('SET_CAISSIER', requete.data.caissiers)
  },

  async getTrashAll({ commit }) {
    commit('SET_CAISSIER', [])
    const requete = await this.$axios.get('api/parametres/caissiers/trashed')
    commit('SET_CAISSIER', requete.data.caissiers)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/caissiers/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/caissiers/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/caissiers/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/caissiers/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/caissiers/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async attribuer({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/caissiers/attribuer', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async desattribuer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/caissiers/desattribuer/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_CAISSIER(state, caissiers) {
    state.caissiers = caissiers
  },
}
