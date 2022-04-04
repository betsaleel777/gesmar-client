export const state = () => ({
  roles: [],
})
export const getters = {
  roles: (state) => {
    return state.roles
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_ROLES', [])
    const requete = await this.$axios.get('api/parametres/roles')
    commit('SET_ROLES', requete.data.roles)
  },
  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/roles/' + id)
    return requete.data.role
  },
  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put(
      'api/parametres/roles/' + payload.id,
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/roles/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post(
      'api/parametres/roles/store',
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_ROLES(state, roles) {
    state.roles = roles
  },
}
