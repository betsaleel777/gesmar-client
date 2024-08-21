<template>
  <div class="container-fluid">
    <PartialBreadcrumb :liens="liens" />
    <b-nav tabs>
      <b-nav-item
        to="/parametre/architecture"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/architecture')"
        >Acceuil</b-nav-item
      >
      <b-nav-item
        to="/parametre/architecture/parent/site"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/architecture/parent/site')"
        >Marchés</b-nav-item
      >
      <b-nav-item
        to="/parametre/architecture/parent/pavillon"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/architecture/parent/pavillon')"
        >Pavillons</b-nav-item
      >
      <b-nav-item
        to="/parametre/architecture/parent/niveau"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/architecture/parent/niveau')"
        >Niveaux</b-nav-item
      >
      <b-nav-item
        to="/parametre/architecture/parent/zone"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/architecture/parent/zone')"
        >Zones</b-nav-item
      >
      <b-nav-item
        to="/parametre/architecture/parent/emplacement"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/architecture/parent/emplacement')"
        >Emplacements</b-nav-item
      >
      <b-nav-item
        to="/parametre/architecture/parent/equipement"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/architecture/parent/equipement')"
        >Equipements</b-nav-item
      >
      <b-nav-item
        to="/parametre/architecture/parent/service-annexe"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/architecture/parent/service-annexe')"
        >Services Annexes</b-nav-item
      >
      <b-nav-item
        to="/parametre/architecture/parent/type-equipement"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/architecture/parent/type-equipement')"
        >Types d'équipement</b-nav-item
      >
      <b-nav-item
        to="/parametre/architecture/parent/type-emplacement"
        :active-class="'bg-white text-primary'"
        :link-classes="link"
        exact
        :exact-active-class="active('/parametre/architecture/parent/type-emplacement')"
        >Types d'emplacement</b-nav-item
      >
    </b-nav>
    <NuxtChild class="mt-5" />
  </div>
</template>
<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
export default {
  components: { PartialBreadcrumb },
  data: () => ({
    liens: [{ path: '#', text: 'Configuration de marché' }],
    link: ['bg-light', 'text-primary'],
  }),
  head: {
    titleTemplate: 'Configurations %s',
  },
  methods: {
    active(route) {
      return this.$route.path === route ? 'active' : ''
    },
  },
}
</script>
