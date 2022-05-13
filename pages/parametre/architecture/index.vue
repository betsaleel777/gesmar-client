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
            id="batiment-tab"
            class="nav-link"
            data-toggle="tab"
            href="#batiment"
            role="tab"
            aria-controls="batiment"
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
          class="tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="market-tab"
        >
          <ListeMarche
            v-if="!archive.marche"
            @archivage="archive.marche = true"
          />
          <ListeMarcheArchive v-else @back="archive.marche = false" />
        </div>
        <div
          id="batiment"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="batiment-tab"
        >
          <ListePavillon
            v-if="!archive.batiment"
            @archivage="archive.batiment = true"
          />
          <ListePavillonArchive v-else @back="archive.batiment = false" />
        </div>
        <div
          id="niveau"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="niveau-tab"
        >
          <ListeNiveau
            v-if="!archive.niveau"
            @archivage="archive.niveau = true"
          />
          <ListeNiveauArchive v-else @back="archive.niveau = false" />
        </div>
        <div
          id="zone"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="zone-tab"
        >
          <ListeZone v-if="!archive.zone" @archivage="archive.zone = true" />
          <ListeZoneArchive v-else @back="archive.zone = false" />
        </div>
        <div
          id="emplacement"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="emplacement-tab"
        >
          <ListeEmplacement
            v-if="!archive.emplacement"
            @archivage="archive.emplacement = true"
          />
          <ListeEmplacementArchive v-else @back="archive.emplacement = false" />
        </div>
      </div>
    </div>
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
  },
  data: () => ({
    liens: [{ path: '#', text: 'Architecture de marché' }],
    archive: {
      marche: false,
      batiment: false,
      niveau: false,
      zone: false,
      emplacement: false,
    },
  }),
  methods: {},
}
</script>
<style></style>
