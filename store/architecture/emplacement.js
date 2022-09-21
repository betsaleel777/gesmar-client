export const state = () => ({
  emplacements: [],
  equipables: [],
})
export const getters = {
  emplacements: (state) => {
    return state.emplacements
  },
  equipables: (state) => {
    return state.equipables
  },
}
export const actions = {
  async getAll({ commit }) {
    commit('SET_EMPLACEMENT', [])
    const requete = await this.$axios.get('api/parametres/emplacements')
    commit('SET_EMPLACEMENT', requete.data.emplacements)
  },

  // les emplacements dont les contrat qui ne passent pas par l'ordonnacement pour être validés
  async getAutoAll({ commit }) {
    commit('SET_EMPLACEMENT', [])
    const requete = await this.$axios.get('api/parametres/emplacements/autos')
    commit('SET_EMPLACEMENT', requete.data.emplacements)
  },

  async getEquipables({ commit }) {
    commit('SET_EQUIPABLE', [])
    const requete = await this.$axios.get('api/parametres/emplacements/equipables')
    commit('SET_EQUIPABLE', requete.data.emplacements)
  },

  async getMonthRental({ commit }, mois) {
    const requete = await this.$axios.get('api/parametres/emplacements/rental/' + mois)
    return requete.data
  },

  async getTrashAll({ commit }) {
    commit('SET_EMPLACEMENT', [])
    const requete = await this.$axios.get('api/parametres/emplacements/trashed')
    commit('SET_EMPLACEMENT', requete.data.emplacements)
  },

  async getOne({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/emplacements/' + id)
    return requete.data
  },

  async getByMarche({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/emplacements/marche/' + id)
    return requete.data
  },

  async getByMarcheWithGearsLinked({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/emplacements/marche/gears/' + id)
    return requete.data
  },

  async getByMarcheUnlinked({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/emplacements/marche/unlinked/' + id)
    return requete.data
  },

  async getFreeByMarche({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/emplacements/marche/free/' + id)
    return requete.data
  },

  async getBusyByMarche({ commit }, id) {
    const requete = await this.$axios.get('api/parametres/emplacements/marche/busy' + id)
    return requete.data
  },

  async modifier({ dispatch }, payload) {
    const requete = await this.$axios.put('api/parametres/emplacements/' + payload.id, payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async supprimer({ dispatch }, id) {
    const requete = await this.$axios.delete('api/parametres/emplacements/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async restaurer({ dispatch }, id) {
    const requete = await this.$axios.patch('api/parametres/emplacements/restore/' + id)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async ajouter({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/emplacements/store', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },

  async push({ dispatch }, payload) {
    const requete = await this.$axios.post('api/parametres/emplacements/push', payload)
    dispatch('getAll')
    return { message: requete.data.message }
  },
}

export const mutations = {
  SET_EMPLACEMENT(state, emplacements) {
    state.emplacements = emplacements
  },
  SET_EQUIPABLE(state, emplacements) {
    state.equipables = emplacements
  },
}
