export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  user(state) {
    return state.auth.user
  },
}
