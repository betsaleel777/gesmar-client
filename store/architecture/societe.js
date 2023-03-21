export const state = () => ({
  societes: [],
})
export const getters = {
  societes: (state) => {
    return state.societes
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_SOCIETE', [])
    const requete = await this.$axios.get('api/parametres/societes')
    commit('SET_SOCIETE', requete.data.societes)
  },

  async getTrashAll({ commit }) {
    commit('SET_SOCIETE', [])
    const requete = await this.$axios.get('api/parametres/societes/trashed')
    commit('SET_SOCIETE', requete.data.societes)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/societes/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/societes/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/societes/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/societes/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_SOCIETE(state, societes) {
    state.societes = societes
  },
}
