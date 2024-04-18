<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="content-body">
      <b-tabs v-model="tabIndex" content-class="mt-4" active-nav-item-class="font-weight-bold">
        <b-tab title="Types d'équipement" lazy :active="tab === 1" :title-link-class="linkClass(0)"
          ><ListeTypequipement v-if="!archive.typEquipement" @archivage="archive.typEquipement = true" />
          <ListeTypequipementArchive v-else @back="onBack(1)"
        /></b-tab>
        <b-tab title="Types d'emplacement" lazy :active="tab === 2" :title-link-class="linkClass(1)"
          ><ListeTypemplacement v-if="!archive.typEmplacement" @archivage="archive.typEmplacement = true" />
          <ListeTypemplacementArchive v-else @back="onBack(2)"
        /></b-tab>
        <b-tab title="Services Annexes" lazy :active="tab === 3" :title-link-class="linkClass(2)"
          ><ListeAnnexe v-if="!archive.annexe" @archivage="archive.annexe = true" />
          <ListeAnnexeArchive v-else @back="onBack(3)"
        /></b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import ListeTypequipement from '~/components/architecture/typEquipement/ListeTypequipement.vue'
import ListeTypequipementArchive from '~/components/architecture/typEquipement/ListeTypequipementArchive.vue'
import ListeTypemplacement from '~/components/architecture/typEmplacement/ListeTypemplacement.vue'
import ListeTypemplacementArchive from '~/components/architecture/typEmplacement/ListeTypemplacementArchive.vue'
import ListeAnnexe from '~/components/architecture/annexe/ListeAnnexe.vue'
import ListeAnnexeArchive from '~/components/architecture/annexe/ListeAnnexeArchive.vue'
export default {
  components: {
    PartialBreadcrumb,
    ListeTypequipement,
    ListeTypequipementArchive,
    ListeTypemplacement,
    ListeTypemplacementArchive,
    ListeAnnexe,
    ListeAnnexeArchive,
  },
  data: () => ({
    liens: [
      { path: '/parametre/architecture', text: 'Configuration de marché' },
      { path: '#', text: 'Options' },
    ],
    archive: {
      typEmplacement: false,
      typEquipement: false,
      annexe: false,
    },
    tabIndex: 0,
  }),
  computed: {
    tab() {
      return parseInt(this.$route.query.tab)
    },
  },
  methods: {
    onBack(numero) {
      if (numero === 1) {
        this.archive.typEquipement = false
        this.getTypesEquipement()
      } else if (numero === 2) {
        this.archive.typEmplacement = false
        this.getTypesEmplacement()
      } else {
        this.archive.annexe = false
        this.getServicesAnnexes()
      }
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-white', 'text-primary']
      } else {
        return ['bg-light', 'text-primary']
      }
    },
  },
}
</script>
<style></style>
