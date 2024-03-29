export const state = () => ({
  bordereaux: [],
  select: [],
  bordereau: {}
})

export const getters = {
  bordereaux: (state) => {
    return state.bordereaux
  },
  bordereau: (state) => {
    return state.bordereau
  },
  select: (state) => {
    return state.select
  }
}

export const actions = {
  async getAll({ commit }) {
    const requete = await this.$axios.get('api/finances/bordereaux')
    commit('SET_BORDEREAUX', requete.data.bordereaux)
  },

  async getPaginate({ commit }, page = 1) {
    const requete = await this.$axios.get(`api/finances/bordereaux/paginate?page=${page}`)
    commit('SET_BORDEREAUX', requete.data)
  },

  async getSearch({ commit }, payload) {
    const requete = await this.$axios.get(
      `api/finances/bordereaux/search/${payload.search}/paginate?page=${payload.page}`
    )
    commit('SET_BORDEREAUX', requete.data)
  },

  async getForSelect({ commit }) {
    const requete = await this.$axios.get('api/finances/bordereaux/select')
    commit('SET_SELECT', requete.data.bordereaux)
  },

  async getForCashout({ commit }) {
    const requete = await this.$axios.get('api/finances/bordereaux/for-cashout')
    commit('SET_BORDEREAUX', requete.data)
  },

  async getUncashed({ commit }) {
    const requete = await this.$axios.get('api/finances/bordereaux/uncashed')
    commit('SET_BORDEREAUX', requete.data)
  },

  async getTrashAll({ commit }) {
    const requete = await this.$axios.get('api/finances/bordereaux/trashed')
    commit('SET_BORDEREAUX', requete.data.bordereaux)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/finances/bordereaux/' + id)
    commit('SET_BORDEREAU', requete.data.bordereau)
  },

  async getOneForCashout({ commit }, id) {
    commit('SET_BORDEREAU', [])
    const requete = await this.$axios.get('api/finances/bordereaux/one-for-cashout/' + id)
    commit('SET_BORDEREAU', requete.data)
  },

  async getOneForCollect({ commit }, id) {
    commit('SET_BORDEREAU', [])
    const requete = await this.$axios.get('api/finances/bordereaux/for-collecte/' + id)
    commit('SET_BORDEREAU', requete.data)
  },

  async getEdit({ commit }, id) {
    commit('SET_BORDEREAU', [])
    const requete = await this.$axios.get('api/finances/bordereaux/edit/' + id)
    commit('SET_BORDEREAU', requete.data)
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/finances/bordereaux/' + payload.bordereau_id, payload)
    dispatch('getPaginate')
    return requete.data.message
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/finances/bordereaux/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/finances/bordereaux/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  }
}

export const mutations = {
  SET_BORDEREAUX(state, bordereaux) {
    state.bordereaux = bordereaux
  },
  SET_BORDEREAU(state, bordereau) {
    state.bordereau = bordereau
  },
  SET_SELECT(state, select) {
    state.select = select
  }
}
