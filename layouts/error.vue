<template>
  <div class="page-error">
    <div class="error-panel">
      <a href="dashboard-one.html" class="sidebar-logo mg-b-40"><span>Gesmar</span></a>
      <!-- <div class="svg-wrapper">
        <object type="image/svg+xml" data="/images/abstract-timekeeper.svg"></object>
      </div> -->
      <div v-if="Number($route.query.code) === 404">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">404 Page demandée inexistante</h1>
      </div>
      <div v-else-if="Number($route.query.code) === 500">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">500 Erreur interne lié au serveur</h1>
      </div>
      <div v-else-if="Number($route.query.code) === 501">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">
          501 Fonctionnalité réclamée non supportée par le serveur.
        </h1>
      </div>
      <div v-else-if="Number($route.query.code) === 502">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">
          En agissant en tant que serveur proxy ou passerelle, le serveur a reçu une réponse invalide depuis
          le serveur distant.
        </h1>
      </div>
      <div v-else-if="Number($route.query.code) === 503">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">
          Service temporairement indisponible ou en maintenance.
        </h1>
      </div>
      <div v-else-if="Number($route.query.code) === 504">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">
          Temps d’attente d’une réponse d’un serveur à un serveur intermédiaire écoulé.
        </h1>
      </div>
      <div v-else-if="Number($route.query.code) === 505">
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">Version HTTP non gérée par le serveur.</h1>
      </div>
      <div v-else>
        <h1 class="tx-28 tx-sm-36 tx-numeric tx-md-40 tx-semibold">Une erreure très rare a eu lieu.</h1>
      </div>
      <h4 class="tx-16 tx-sm-18 tx-md-24 tx-light mg-b-20 mg-md-b-30">
        Oopps. Quelque chose s'est mal passé, veuillez contacter
        <a href="https://segoor.com">le service de support de Segoor</a>
      </h4>
      <NuxtLink to="/">Page d'accueil</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
}
</script>
<style scoped></style>
