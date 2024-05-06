export const state = () => ({
  url: null,
})
export const getters = {
  url: (state) => {
    return state.url
  },
}
export const actions = {
  async getUrl({ commit }, path) {
    const response = await this.$axios.get('api/media', { params: { path }, responseType: 'blob' })
    const blob = new Blob([response.data], { type: ['image/png', 'image/jpg', 'image/jpeg'] })
    commit('SET_URL', URL.createObjectURL(blob))
  },
}

export const mutations = {
  SET_URL(state, url) {
    state.url = url
  },
}
