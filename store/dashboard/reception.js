export const state = () => ({
  validation: {},
  conversion: {},
  busy: {},
  equipped: {},
  linked: {},
  subscribed: {},
  loading: {
    validation: false,
    conversion: false,
    busy: false,
    equipped: false,
    linked: false,
    subscribed: false
  }
})
export const getters = {
  validation: (state) => {
    return state.validation
  },
  conversion: (state) => {
    return state.conversion
  },
  busy: (state) => {
    return state.busy
  },
  equipped: (state) => {
    return state.equipped
  },
  linked: (state) => {
    return state.linked
  },
  subscribed: (state) => {
    return state.subscribed
  },
  loading: (state) => {
    return state.loading
  }
}
export const actions = {
  async getValidationRate({ commit }, dates = null) {
    commit('SET_LOADING', { type: 'validation', active: true })
    const requete = await this.$axios.get('api/dashboard/reception/validation-rate', { params: { dates } })
    commit('SET_VALIDATION_RATE', requete.data)
    commit('SET_LOADING', { type: 'validation', active: false })
  },
  async getConversionRate({ commit }, dates = null) {
    commit('SET_LOADING', { type: 'conversion', active: true })
    const requete = await this.$axios.get('api/dashboard/reception/conversion-rate', { params: { dates } })
    commit('SET_CONVERSION_RATE', requete.data)
    commit('SET_LOADING', { type: 'conversion', active: false })
  },
  async getBusyRate({ commit }, dates = null) {
    commit('SET_LOADING', { type: 'busy', active: true })
    const requete = await this.$axios.get('api/dashboard/reception/busy-rate', { params: { dates } })
    commit('SET_BUSY_RATE', requete.data)
    commit('SET_LOADING', { type: 'busy', active: false })
  },
  async getEquippedRate({ commit }, dates = null) {
    commit('SET_LOADING', { type: 'equipped', active: true })
    const requete = await this.$axios.get('api/dashboard/reception/equipped-rate', { params: { dates } })
    commit('SET_EQUIPPED_RATE', requete.data)
    commit('SET_LOADING', { type: 'equipped', active: false })
  },
  async getLinkedRate({ commit }, dates = null) {
    commit('SET_LOADING', { type: 'linked', active: true })
    const requete = await this.$axios.get('api/dashboard/reception/linked-rate', { params: { dates } })
    commit('SET_LINKED_RATE', requete.data)
    commit('SET_LOADING', { type: 'linked', active: false })
  },
  async getSubscribedRate({ commit }, dates = null) {
    commit('SET_LOADING', { type: 'subscribed', active: true })
    const requete = await this.$axios.get('api/dashboard/reception/subscribed-rate', { params: { dates } })
    commit('SET_SUBSCRIBED_RATE', requete.data)
    commit('SET_LOADING', { type: 'subscribed', active: false })
  }
}

export const mutations = {
  SET_VALIDATION_RATE(state, validation) {
    state.validation = validation
  },
  SET_CONVERSION_RATE(state, conversion) {
    state.conversion = conversion
  },
  SET_BUSY_RATE(state, busy) {
    state.busy = busy
  },
  SET_EQUIPPED_RATE(state, equipped) {
    state.equipped = equipped
  },
  SET_LINKED_RATE(state, linked) {
    state.linked = linked
  },
  SET_SUBSCRIBED_RATE(state, subscribed) {
    state.subscribed = subscribed
  },
  SET_LOADING(state, payload) {
    state.loading[payload.type] = payload.active
  }
}
