export const state = () => ({
  marches: [],
  structure: []
})
export const getters = {
  marches: (state) => {
    return state.marches
  },
  structure: (state) => {
    return state.structure
  }
}

export const actions = {
  async getAll({ commit }) {
    const requete = await this.$axios.get('api/parametres/marches')
    commit('SET_MARCHE', requete.data.marches)
  },

  async getSelect({ commit }) {
    const requete = await this.$axios.get('api/parametres/marches/select')
    commit('SET_MARCHE', requete.data.marches)
  },

  async getTrashAll({ commit }) {
    const requete = await this.$axios.get('api/parametres/marches/trashed')
    commit('SET_MARCHE', requete.data.marches)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/marches/' + id)
    return requete.data
  },
  async getGeneralStructure({ commit }) {
    const requete = await this.$axios.get('api/parametres/marches/structure')
    commit('SET_STRUCTURE', requete.data.structure)
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/marches/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/marches/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/marches/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/marches/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async push({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/marches/push', payload)
    dispatch('getAll')
    return { message: requete.data.message, donnees: requete.data.marche }
  }
}

export const mutations = {
  SET_MARCHE(state, marches) {
    state.marches = marches
  },
  SET_STRUCTURE(state, structure) {
    state.structure = structure
  }
}
