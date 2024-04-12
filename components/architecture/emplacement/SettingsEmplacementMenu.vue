<template>
  <div class="content-right content-right-components">
    <label>Autres Configurations</label>
    <nav id="navSection" class="nav flex-column">
      <nuxt-link v-can="displayEquipement" to="/parametre/architecture/setting?tab=1" class="nav-link"
        >Types d'équipement</nuxt-link
      >
      <nuxt-link v-can="displayEmplacement" to="/parametre/architecture/setting?tab=2" class="nav-link"
        >Types d'emplacement</nuxt-link
      >
      <nuxt-link v-can="displayServices" to="/parametre/architecture/setting?tab=3" class="nav-link"
        >Services Annexes</nuxt-link
      >
    </nav>
  </div>
</template>
<script>
import { typeEmplacement, typeEquipement, serviceAnnexe } from '~/helper/permissions'
export default {
  computed: {
    displayEquipement() {
      return this.$gates.hasAnyPermission(`${typeEmplacement.global}|${typeEmplacement.own}`)
    },
    displayEmplacement() {
      return this.$gates.hasAnyPermission(`${typeEquipement.global}|${typeEquipement.own}`)
    },
    displayServices() {
      return this.$gates.hasAnyPermission(`${serviceAnnexe.global}|${serviceAnnexe.own}`)
    },
  },
}
</script>
<style lang=""></style>
