export const state = () => ({
  users: [],
})
export const getters = {
  users: (state) => {
    return state.users
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_USERS', [])
    const requete = await this.$axios.get('api/parametres/users')
    commit('SET_USERS', requete.data.users)
  },
  async getUncommercials({ commit }) {
    commit('SET_USERS', [])
    const requete = await this.$axios.get('api/parametres/users/uncommercials')
    commit('SET_USERS', requete.data.users)
  },

  async getTrashAll({ commit }) {
    commit('SET_USERS', [])
    const requete = await this.$axios.get('api/parametres/users/trashed')
    commit('SET_USERS', requete.data.users)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/users/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('parametre/users/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/users/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/users/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/users/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async profile({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/users/profile', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async security({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/users/security', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async autoriser({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/users/autoriser', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async notifications({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/users/notifications', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
}
