<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="content-body content-body-components">
      <ul id="tabArchitecture" class="nav nav-line" role="tablist">
        <li class="nav-item">
          <a
            id="acceuil-tab"
            class="nav-link active"
            data-toggle="tab"
            href="#acceuil"
            role="tab"
            aria-controls="acceuil"
            aria-selected="true"
            >Acceuil</a
          >
        </li>
        <li class="nav-item">
          <a
            id="market-tab"
            class="nav-link"
            data-toggle="tab"
            href="#market"
            role="tab"
            aria-controls="market"
            aria-selected="false"
            >Marchés</a
          >
        </li>
        <li class="nav-item">
          <a
            id="pavillon-tab"
            class="nav-link"
            data-toggle="tab"
            href="#pavillon"
            role="tab"
            aria-controls="pavillon"
            aria-selected="false"
            >Pavillons</a
          >
        </li>
        <li class="nav-item">
          <a
            id="niveau-tab"
            class="nav-link"
            data-toggle="tab"
            href="#niveau"
            role="tab"
            aria-controls="niveau"
            aria-selected="false"
            >Niveaux</a
          >
        </li>
        <li class="nav-item">
          <a
            id="zone-tab"
            class="nav-link"
            data-toggle="tab"
            href="#zone"
            role="tab"
            aria-controls="zone"
            aria-selected="false"
            >Zones</a
          >
        </li>
        <li class="nav-item">
          <a
            id="emplacement-tab"
            class="nav-link"
            data-toggle="tab"
            href="#emplacement"
            role="tab"
            aria-controls="emplacement"
            aria-selected="false"
            @click="setting.emplacement.visible = true"
            >Emplacements</a
          >
        </li>
      </ul>
      <div id="tabArchitectureContent" class="tab-content mg-t-20">
        <div
          id="acceuil"
          class="tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="acceuil-tab"
        >
          <AcceuilArchitecture />
        </div>
        <div
          id="market"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="market-tab"
        >
          <ListeMarche
            v-if="!archive.marche"
            :marches="marches"
            @archivage="archive.marche = true"
          />
          <ListeMarcheArchive v-else @back="onBack(1)" />
        </div>
        <div
          id="pavillon"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="pavillon-tab"
        >
          <ListePavillon
            v-if="!archive.pavillon"
            :marches="marches"
            :pavillons="pavillons"
            @archivage="archive.pavillon = true"
          />
          <ListePavillonArchive v-else @back="onBack(2)" />
        </div>
        <div
          id="niveau"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="niveau-tab"
        >
          <ListeNiveau
            v-if="!archive.niveau"
            :pavillons="pavillons"
            :niveaux="niveaux"
            @archivage="archive.niveau = true"
          />
          <ListeNiveauArchive v-else @back="onBack(3)" />
        </div>
        <div
          id="zone"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="zone-tab"
        >
          <ListeZone
            v-if="!archive.zone"
            :niveaux="niveaux"
            :zones="zones"
            @archivage="archive.zone = true"
          />
          <ListeZoneArchive v-else @back="onBack(4)" />
        </div>
        <div
          id="emplacement"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="emplacement-tab"
        >
          <ListeEmplacement
            v-if="!archive.emplacement"
            :marches="marches"
            :emplacements="emplacements"
            :types="types"
            :zones="zones"
            @archivage="archive.emplacement = true"
          />
          <ListeEmplacementArchive v-else @back="onBack(5)" />
        </div>
      </div>
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
      emplacement: {
        visible: false,
        activate: 1,
      },
    },
  }),
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
  created() {
    this.getMarches()
    this.getNiveaux()
    this.getPavillons()
    this.getZones()
    this.getEmplacements()
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
  },
}
</script>
<style></style>
