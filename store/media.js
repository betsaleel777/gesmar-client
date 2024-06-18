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
    try {
      const response = await this.$axios.get('api/media', { params: { path }, responseType: 'blob' })
      const blob = new Blob([response.data], { type: ['image/png', 'image/jpg', 'image/jpeg'] })
      commit('SET_URL', URL.createObjectURL(blob))
    } catch (error) {
      if (error.response.status === 404) commit('SET_URL', 'https://via.placeholder.com/500/637382/fff')
    }
  },
}

export const mutations = {
  SET_URL(state, url) {
    state.url = url
  },
}
