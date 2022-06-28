export default function ({ $auth }) {
  if (!$auth.loggedIn) {
    console.log('pas connecté', $auth.loggedIn)
  }
}
