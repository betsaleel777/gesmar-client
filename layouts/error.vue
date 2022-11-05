<template>
  <div class="page-error">
    <div class="error-panel">
      <a href="dashboard-one.html" class="sidebar-logo mg-b-40"><span>Gesmar</span></a>
      <div class="svg-wrapper mg-b-40">
        <object type="image/svg+xml" data="http://themepixels.me/cassie/assets/svg/notfound.svg"></object>
      </div>
      <div v-if="error.statusCode === 404">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">404 Page demandée inexistante</h1>
      </div>
      <div v-else-if="error.statusCode === 500">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">500 Erreur interne lié au serveur</h1>
      </div>
      <div v-else-if="error.statusCode === 503">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">503 Service Indisponible</h1>
      </div>
      <div v-else-if="error.statusCode === 505">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">503 Accès Interdit</h1>
      </div>
      <h4 class="tx-16 tx-sm-18 tx-md-24 tx-light mg-b-20 mg-md-b-30">
        Oopps. The page you were looking for doesn't exist.
      </h4>
      <p class="tx-12 tx-sm-13 tx-md-14 tx-color-04">
        You may have mistyped the address or the page may have moved. Try searching below.
      </p>
      <NuxtLink to="/">Page d'accueil</NuxtLink>
      <!-- search-form -->
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  // mounted() {
  //   console.error(this.error)
  // },
}
</script>
<style scoped></style>
