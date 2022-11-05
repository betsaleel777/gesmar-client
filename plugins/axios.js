export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    if (Number(error.response.status) === 401) {
      redirect('/login')
    } else {
      redirect('/error', { code: error.response.status })
    }
  })
}
