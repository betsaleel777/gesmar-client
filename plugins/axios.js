export default function ({ $axios }) {
  $axios.onError((error) => {
    if (Number(error.response.status) === 403) {
      window.$nuxt.$notify({ text: error.response.data.message, type: 'error', title: 'Authentification' })
    }
  })
}
