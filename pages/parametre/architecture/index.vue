<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="content-body content-body-components">
      <b-tabs
        v-model="tabIndex"
        content-class="mt-7"
        active-nav-item-class="font-weight-bold"
        @activate-tab="options"
      >
        <b-overlay :show="$fetchState.pending" rounded="sm">
          <b-tab title="Acceuil" :title-link-class="linkClass(0)">
            <AcceuilArchitecture />
          </b-tab>
          <b-tab title="Marchés" :title-link-class="linkClass(1)">
            <ListeMarche
              v-if="!archive.marche"
              :marches="marches"
              @archivage="archive.marche = true"
            />
            <ListeMarcheArchive v-else @back="onBack(1)" />
          </b-tab>
          <b-tab title="Pavillons" :title-link-class="linkClass(2)">
            <ListePavillon
              v-if="!archive.pavillon"
              :marches="marches"
              :pavillons="pavillons"
              @archivage="archive.pavillon = true"
            />
            <ListePavillonArchive v-else @back="onBack(2)" />
          </b-tab>
          <b-tab title="Niveaux" :title-link-class="linkClass(3)">
            <ListeNiveau
              v-if="!archive.niveau"
              :pavillons="pavillons"
              :niveaux="niveaux"
              @archivage="archive.niveau = true"
            />
            <ListeNiveauArchive v-else @back="onBack(3)" />
          </b-tab>
          <b-tab title="Zones" :title-link-class="linkClass(4)">
            <ListeZone
              v-if="!archive.zone"
              :niveaux="niveaux"
              :zones="zones"
              @archivage="archive.zone = true"
            />
            <ListeZoneArchive v-else @back="onBack(4)" />
          </b-tab>
          <b-tab title="Emplacements" :title-link-class="linkClass(5)">
            <ListeEmplacement
              v-if="!archive.emplacement"
              :marches="marches"
              :emplacements="emplacements"
              :types="types"
              :zones="zones"
              @archivage="archive.emplacement = true"
            />
            <ListeEmplacementArchive v-else @back="onBack(5)" />
          </b-tab>
        </b-overlay>
      </b-tabs>
    </div>
    <SettingsEmplacementMenu
      v-if="setting.emplacement.visible"
      :key="setting.emplacement.visible"
    />
    <!-- content-right -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
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
import SettingsEmplacementMenu from '~/components/architecture/emplacement/SettingsEmplacementMenu.vue'
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
    SettingsEmplacementMenu,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Architecture de marché' }],
    archive: {
      marche: false,
      pavillon: false,
      niveau: false,
      zone: false,
      emplacement: false,
      type: false,
    },
    setting: {
      emplacement: { visible: false },
    },
    tabIndex: 0,
  }),
  fetch() {
    this.getMarches()
    this.getNiveaux()
    this.getPavillons()
    this.getZones()
    this.getEmplacements()
  },
  computed: {
    ...mapGetters({
      marches: 'architecture/marche/marches',
      pavillons: 'architecture/pavillon/pavillons',
      niveaux: 'architecture/niveau/niveaux',
      zones: 'architecture/zone/zones',
      types: 'architecture/typEmplacement/types',
      emplacements: 'architecture/emplacement/emplacements',
    }),
  },
  methods: {
    ...mapActions({
      getMarches: 'architecture/marche/getAll',
      getPavillons: 'architecture/pavillon/getAll',
      getNiveaux: 'architecture/niveau/getAll',
      getZones: 'architecture/zone/getAll',
      getEmplacements: 'architecture/emplacement/getAll',
    }),
    onBack(numero) {
      if (numero === 1) {
        this.archive.marche = false
        this.getMarches()
      } else if (numero === 2) {
        this.archive.pavillon = false
        this.getPavillons()
      } else if (numero === 3) {
        this.archive.niveau = false
        this.getNiveaux()
      } else if (numero === 4) {
        this.archive.zone = false
        this.getZones()
      } else {
        this.archive.emplacement = false
        this.getEmplacements()
      }
    },
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-white', 'text-primary']
      } else {
        return ['bg-light', 'text-primary']
      }
    },
    options(idx) {
      if (idx === 5) {
        this.setting.emplacement.visible = true
      } else {
        this.setting.emplacement.visible = false
      }
    },
  },
}
</script>
<style></style>
