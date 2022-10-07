export const state = () => ({
  collectes: [],
})
export const getters = {
  collectes: (state) => {
    return state.collectes
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_COLLECTE', [])
    const requete = await this.$axios.get('api/finances/collectes')
    commit('SET_COLLECTE', requete.data.collectes)
  },

  async getTrashAll({ commit }) {
    commit('SET_COLLECTE', [])
    const requete = await this.$axios.get('api/finances/collectes/trashed')
    commit('SET_COLLECTE', requete.data.collectes)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/collectes/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/collectes/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/finances/collectes/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/finances/collectes/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/collectes/store', payload)
    dispatch('finance/attribution/getAllWithBorderau', {}, { root: true })
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_COLLECTE(state, collectes) {
    state.collectes = collectes
  },
}
