export default function ({ $axios, redirect }) {
  const erreursCritiques = [404, 403, 500, 501, 502, 503, 504, 505]
  $axios.onError((error) => {
    if (Number(error.response.status) === 401) {
      location.reload()
    } else if (erreursCritiques.includes(Number(error.response.status))) {
      redirect('/error', { code: error.response.status })
    }
  })
}
