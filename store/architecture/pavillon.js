export const state = () => ({
  pavillons: [],
  selected: [],
})
export const getters = {
  pavillons: (state) => {
    return state.pavillons
  },
  selected: (state) => {
    return state.selected
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_PAVILLON', [])
    const requete = await this.$axios.get('api/parametres/pavillons')
    commit('SET_PAVILLON', requete.data.pavillons)
  },

  async getByMarche({ commit }, id) {
    commit('SET_SELECTED', [])
    const requete = await this.$axios.get('api/parametres/pavillons/marche/' + id)
    commit('SET_SELECTED', requete.data.pavillons)
  },

  async getTrashAll({ commit }) {
    commit('SET_PAVILLON', [])
    const requete = await this.$axios.get('api/parametres/pavillons/trashed')
    commit('SET_PAVILLON', requete.data.pavillons)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/pavillons/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/pavillons/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/pavillons/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/pavillons/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/pavillons/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async push({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/pavillons/push', payload)
    dispatch('getAll')
    return { message: requete.data.message, donnees: requete.data.pavillons }
  },
}

export const mutations = {
  SET_PAVILLON(state, pavillons) {
    state.pavillons = pavillons
  },
  SET_SELECTED(state, selected) {
    state.selected = selected
  },
}
