<template>
  <div></div>
</template>
<script>
export default {
  mounted() {
    this.$bvToast.toast(
      `Une erreur est survenue lors de l'affichage de la page`,
      {
        title: 'Erreur',
        autoHideDelay: 5000,
        variant: 'danger',
        solid: true,
      }
    )
    this.$router.push('/')
  },
}
</script>
