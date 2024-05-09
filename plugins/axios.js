export default function ({ $axios, route }) {
  $axios.onError((error) => {
    if (Number(error.response.status) === 403) {
      window.$nuxt.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    } else if (Number(error.response.status) === 401 && route.name !== 'login') {
      location.reload()
    }
  })
}
