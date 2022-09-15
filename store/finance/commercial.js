export const state = () => ({
  commerciaux: [],
})
export const getters = {
  commerciaux: (state) => {
    return state.commerciaux
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_COMMERCIAUX', [])
    const requete = await this.$axios.get('api/exploitations/finances/commerciaux')
    commit('SET_COMMERCIAUX', requete.data.commerciaux)
  },

  async getTrashAll({ commit }) {
    commit('SET_COMMERCIAUX', [])
    const requete = await this.$axios.get('api/exploitations/finances/commerciaux/trashed')
    commit('SET_COMMERCIAUX', requete.data.commerciaux)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/exploitations/finances/commerciaux/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/exploitations/finances/commerciaux/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/exploitations/finances/commerciaux/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/exploitations/finances/commerciaux/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/exploitations/finances/commerciaux/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_COMMERCIAUX(state, commerciaux) {
    state.commerciaux = commerciaux
  },
}
