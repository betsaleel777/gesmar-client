export const state = () => ({
  ouvertures: []
})
export const getters = {
  ouvertures: (state) => {
    return state.ouvertures
  }
}
export const actions = {
  async getAll({ commit }) {
    const requete = await this.$axios.get('api/finances/caisses/ouvertures')
    commit('SET_OUVERTURE', requete.data.ouvertures)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/caisses/ouvertures/' + id)
    return requete.data
  },

  async getPaginate({ commit }, page = 1) {
    const requete = await this.$axios.get(`api/finances/caisses/ouvertures/paginate?page=${page}`)
    commit('SET_OUVERTURE', requete.data)
  },

  async getSearch({ commit }, payload) {
    const requete = await this.$axios.get(
      `api/finances/caisses/ouvertures/search/${payload.search}/paginate?page=${payload.page}`
    )
    commit('SET_OUVERTURE', requete.data)
  },

  async getByCaissier({ commit }, id) {
    const requete = await this.$axios.get('api/finances/caisses/ouvertures/current/caissier/' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/caisses/ouvertures/' + payload.id, payload)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/caisses/ouvertures/store', payload)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async ouvertureExists({ dispatch }, caissier) {
    const requete = await this.$axios.get('api/finances/caisses/ouvertures/exists/' + caissier)
    return Boolean(requete.data.exists)
  },
  async ouvertureUsingExists({ dispatch }, payload) {
    const requete = await this.$axios.get(
      `api/finances/caisses/ouvertures/using/caissier/${payload.caissier_id}`
    )
    return Boolean(requete.data.exists)
  }
}

export const mutations = {
  SET_OUVERTURE(state, ouvertures) {
    state.ouvertures = ouvertures
  }
}
