export const state = () => ({
  equipements: [],
})

export const getters = {
  equipements: (state) => state.equipements,
  equipementsBySites: (state) => (sites) => {
    const ids = sites.map((site) => site.id)
    return state.equipements.filter((equipement) => ids.includes(equipement.site_id))
  },
}

export const actions = {
  async getAll({ commit }) {
    commit('SET_EQUIPEMENT', [])
    const requete = await this.$axios.get('api/parametres/equipements')
    commit('SET_EQUIPEMENT', requete.data.equipements)
  },

  async getPaginate({ commit }, page = 1) {
    const requete = await this.$axios.get(`api/parametres/equipements/paginate?page=${page}`)
    commit('SET_EQUIPEMENT', requete.data)
  },

  async getSearch({ commit }, payload) {
    const requete = await this.$axios.get(`api/parametres/equipements/search/${payload.search}/paginate?page=${payload.page}`)
    commit('SET_EQUIPEMENT', requete.data)
  },

  async getTrashAll({ commit }) {
    commit('SET_EQUIPEMENT', [])
    const requete = await this.$axios.get('api/parametres/equipements/trashed')
    commit('SET_EQUIPEMENT', requete.data.equipements)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/equipements/' + id)
    return requete.data
  },

  // récupération des equipememnts selon le type
  async getByType({ commit }, payload) {
    const requete = await this.$axios.get(`api/parametres/equipements/type/${payload.typeId}/emplacement/${payload.emplacement_id}/site/${payload.site_id}`)
    return requete.data
  },

  // récupération des equipememnts non liés et non abonnés
  async getGearsUnlinkedsubscribed({ commit }) {
    const requete = await this.$axios.get('api/parametres/equipements/unlinkedsubscribed')
    commit('SET_EQUIPEMENT', requete.data)
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/equipements/' + payload.id, payload)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/equipements/' + id)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/equipements/restore/' + id)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/equipements/store', payload)
    dispatch('getPaginate')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_EQUIPEMENT(state, equipements) {
    state.equipements = equipements
  },
  ADD_EQUIPEMENT(state, equipements) {
    equipements.forEach((equipement) => {
      state.equipements.push(equipement)
    })
  },
}
