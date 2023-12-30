export const state = () => ({
  reception: []
})
export const getters = {
  reception: (state) => {
    return state.reception
  }
}
export const actions = {
  async getReception({ commit }) {
    const requete = await this.$axios.get('api/dashboard/reception')
    commit('SET_RECEPTION', requete.data)
  }
}

export const mutations = {
  SET_RECEPTION(state, reception) {
    state.reception = reception
  }
}
