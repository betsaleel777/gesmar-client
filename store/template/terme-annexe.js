export const state = () => ({
  termes: [],
})

export const getters = {
  termes: (state) => {
    return state.termes
  },
}

export const actions = {
  async getAll({ commit }) {
    commit('SET_TERMES', [])
    const requete = await this.$axios.get('api/parametres/termes/annexes')
    commit('SET_TERMES', requete.data.termes)
  },

  async getTrashAll({ commit }) {
    commit('SET_TERMES', [])
    const requete = await this.$axios.get('api/parametres/termes/annexes/trashed')
    commit('SET_TERMES', requete.data.termes)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/termes/annexes/' + id)
    return requete.data
  },

  async getPdf({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/termes/annexes/pdf/' + id)
    return { path: requete.data.pdf }
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/termes/annexes/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/termes/annexes/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/termes/annexes/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/termes/annexes/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_TERMES(state, termes) {
    state.termes = termes
  },
}
