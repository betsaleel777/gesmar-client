export const state = () => ({
  collectes: []
})

export const getters = {
  collectes: (state) => {
    return state.collectes
  },
  daysCollected: (state) => {
    return state.collectes.map(({ jour }) => jour)
  }
}

export const actions = {
  async getAll({ commit }) {
    const requete = await this.$axios.get('api/finances/collectes')
    commit('SET_COLLECTE', requete.data)
  },
  async getAlreadyCollected({ commit }, payload) {
    const requete = await this.$axios.get('api/finances/collectes/collected', { params: { ...payload } })
    commit('SET_COLLECTE', requete.data)
  },
  async ajouter({ commit }, payload) {
    const requete = await this.$axios.post('api/finances/collectes/store', payload)
    return requete.data
  }
}

export const mutations = {
  SET_COLLECTE(state, collectes) {
    state.collectes = collectes
  }
}
