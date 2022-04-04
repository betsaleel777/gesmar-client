export const state = () => ({
  permissions: [],
})
export const getters = {
  permissions: (state) => {
    return state.permissions
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_PERMISSIONS', [])
    const requete = await this.$axios.get('api/parametres/permissions')
    commit('SET_PERMISSIONS', requete.data.permissions)
  },
}

export const mutations = {
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions
  },
}
