<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="content-body content-body-components">
      <b-tabs v-model="tabIndex" content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab title="Acceuil" lazy :title-link-class="linkClass(0)">
          <AcceuilArchitecture />
        </b-tab>
        <b-tab title="Marchés" lazy :title-link-class="linkClass(1)">
          <ListeMarche v-if="!archive.marche" @archivage="archive.marche = true" />
          <ListeMarcheArchive v-else @back="onBack(1)" />
        </b-tab>
        <b-tab title="Pavillons" lazy :title-link-class="linkClass(2)">
          <ListePavillon v-if="!archive.pavillon" @archivage="archive.pavillon = true" />
          <ListePavillonArchive v-else @back="onBack(2)" />
        </b-tab>
        <b-tab title="Niveaux" lazy :title-link-class="linkClass(3)">
          <ListeNiveau v-if="!archive.niveau" @archivage="archive.niveau = true" />
          <ListeNiveauArchive v-else @back="onBack(3)" />
        </b-tab>
        <b-tab title="Zones" lazy :title-link-class="linkClass(4)">
          <ListeZone v-if="!archive.zone" @archivage="archive.zone = true" />
          <ListeZoneArchive v-else @back="onBack(4)" />
        </b-tab>
        <b-tab title="Emplacements" lazy :title-link-class="linkClass(5)">
          <ListeEmplacement v-if="!archive.emplacement" @archivage="archive.emplacement = true" />
          <ListeEmplacementArchive v-else @back="onBack(5)" />
        </b-tab>
        <b-tab title="Equipements" lazy :title-link-class="linkClass(6)">
          <ListeEquipement v-if="!archive.equipement" @archivage="archive.equipement = true" />
          <ListeEquipementArchive v-else @back="onBack(6)" />
        </b-tab>
        <b-tab title="Abonnements" lazy :title-link-class="linkClass(7)">
          <ListeAbonnement />
        </b-tab>
      </b-tabs>
    </div>
    <SettingsEmplacementMenu />
    <!-- content-right -->
  </div>
</template>
<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import AcceuilArchitecture from '~/components/architecture/AcceuilArchitecture.vue'
import ListeMarche from '~/components/architecture/marche/ListeMarche.vue'
import ListeMarcheArchive from '~/components/architecture/marche/ListeMarcheArchive.vue'
import ListePavillon from '~/components/architecture/pavillon/ListePavillon.vue'
import ListePavillonArchive from '~/components/architecture/pavillon/ListePavillonArchive.vue'
import ListeNiveau from '~/components/architecture/niveau/ListeNiveau.vue'
import ListeNiveauArchive from '~/components/architecture/niveau/ListeNiveauArchive.vue'
import ListeZone from '~/components/architecture/zones/ListeZone.vue'
import ListeZoneArchive from '~/components/architecture/zones/ListeZoneArchive.vue'
import ListeEmplacement from '~/components/architecture/emplacement/ListeEmplacement.vue'
import ListeEmplacementArchive from '~/components/architecture/emplacement/ListeEmplacementArchive.vue'
import ListeEquipement from '~/components/architecture/equipement/ListeEquipement.vue'
import ListeEquipementArchive from '~/components/architecture/equipement/ListeEquipementArchive.vue'
import SettingsEmplacementMenu from '~/components/architecture/emplacement/SettingsEmplacementMenu.vue'
import ListeAbonnement from '~/components/architecture/abonnement/ListeAbonnement.vue'
export default {
  components: {
    PartialBreadcrumb,
    AcceuilArchitecture,
    ListeMarche,
    ListeMarcheArchive,
    ListePavillon,
    ListePavillonArchive,
    ListeNiveau,
    ListeNiveauArchive,
    ListeZone,
    ListeZoneArchive,
    ListeEmplacement,
    ListeEmplacementArchive,
    ListeEquipement,
    ListeEquipementArchive,
    SettingsEmplacementMenu,
    ListeAbonnement,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Configuration de marché' }],
    archive: {
      marche: false,
      pavillon: false,
      niveau: false,
      zone: false,
      emplacement: false,
      equipement: false,
      abonnement: false,
    },
    tabIndex: 0,
  }),
  methods: {
    onBack(numero) {
      if (numero === 1) {
        this.archive.marche = false
      } else if (numero === 2) {
        this.archive.pavillon = false
      } else if (numero === 3) {
        this.archive.niveau = false
      } else if (numero === 4) {
        this.archive.zone = false
      } else if (numero === 5) {
        this.archive.emplacement = false
      } else {
        this.archive.equipement = false
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
