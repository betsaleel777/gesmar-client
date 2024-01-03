export const state = () => ({
  validations: []
})

export const getters = {
  validations: (state) => {
    return state.validations
  }
}

export const actions = {
  async getAll({ commit }) {
    const requete = await this.$axios.get('api/parametres/validations/abonnement')
    commit('SET_VALIDATION', requete.data.validations)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/validations/abonnement/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/validations/abonnement/' + payload.id, payload)
    dispatch('architecture/abonnement/getAll', {}, { root: true })
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/validations/abonnement/store', payload)
    dispatch('architecture/abonnement/getAll', {}, { root: true })
    return { message: requete.data.message }
  }
}

export const mutations = {
  SET_VALIDATION(state, validations) {
    state.validations = validations
  }
}
