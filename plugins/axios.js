export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    if (Number(error.response.status) === 403) {
      window.$nuxt.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    } else if (Number(error.response.status) === 401) {
      location.reload()
    }
  })
}
