export const state = () => ({
  annexes: [],
})
export const getters = {
  annexes: (state) => {
    return state.annexes
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_ANNEXES', [])
    const requete = await this.$axios.get('api/parametres/annexes')
    commit('SET_ANNEXES', requete.data.annexes)
  },
  async getTrashAll({ commit }) {
    commit('SET_ANNEXES', [])
    const requete = await this.$axios.get('api/parametres/annexes/trashed')
    commit('SET_ANNEXES', requete.data.annexes)
  },
  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/annexes/' + id)
    return requete.data
  },
  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put(
      'api/parametres/annexes/' + payload.id,
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/annexes/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.get(
      'api/parametres/annexes/restore/' + id
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post(
      'api/parametres/annexes/store',
      payload
    )
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_ANNEXES(state, annexes) {
    state.annexes = annexes
  },
}
