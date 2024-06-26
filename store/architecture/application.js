export const state = () => ({
  societe: {},
})
export const getters = {
  societe: (state) => state.societe,
}
export const actions = {
  async getOne({ commit }) {
    commit('SET_SOCIETE', [])
    const requete = await this.$axios.get('api/parametres/societes')
    commit('SET_SOCIETE', requete.data.societe)
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/societes/' + payload.get('id') + '?_method=PUT', payload)
    dispatch('getOne')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/societes/store', payload)
    dispatch('getOne')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_SOCIETE(state, societe) {
    state.societe = societe
  },
}
