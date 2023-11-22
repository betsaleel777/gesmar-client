export const state = () => ({
  commerciaux: [],
  salesman: [],
  commercial: {},
  bordereaux: []
})

export const getters = {
  commerciaux: (state) => {
    return state.commerciaux
  },
  commercial: (state) => {
    return state.commercial
  },
  salesman: (state) => {
    return state.salesman
  },
  bordereaux: (state) => {
    return state.bordereaux
  },
  disableDates: (state) => {
    return state.bordereaux.map(({ jour }) => jour)
  }
}

export const actions = {
  async getAll({ commit }) {
    commit('SET_COMMERCIAUX', [])
    const requete = await this.$axios.get('api/finances/commerciaux')
    commit('SET_COMMERCIAUX', requete.data.commerciaux)
  },

  async getForSelect({ commit }) {
    commit('SET_SALESMAN', [])
    const requete = await this.$axios.get('api/finances/commerciaux/select')
    commit('SET_SALESMAN', requete.data.commerciaux)
  },

  async getTrashAll({ commit }) {
    commit('SET_COMMERCIAUX', [])
    const requete = await this.$axios.get('api/finances/commerciaux/trashed')
    commit('SET_COMMERCIAUX', requete.data.commerciaux)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/commerciaux/' + id)
    commit('SET_COMMERCIAL', requete.data.commercial)
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/commerciaux/' + payload.id, payload)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/finances/commerciaux/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/finances/commerciaux/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/commerciaux/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async attribuer({ dispatch }, payload) {
    const requete = await this.$axios.post('api/finances/commerciaux/attribuer', payload)
    dispatch('getAll')
    return requete.data.message
  },
  async getMonthBordereaux({ commit }, id) {
    const requete = await this.$axios.get('api/finances/commerciaux/bordereaux-month/' + id)
    commit('SET_ATTRIBUTIONS', requete.data)
  }
}

export const mutations = {
  SET_COMMERCIAUX(state, commerciaux) {
    state.commerciaux = commerciaux
  },
  SET_ATTRIBUTIONS(state, bordereaux) {
    state.bordereaux = bordereaux
  },
  SET_SALESMAN(state, commerciaux) {
    state.salesman = commerciaux
  },
  SET_COMMERCIAL(state, commercial) {
    state.commercial = commercial
  }
}
