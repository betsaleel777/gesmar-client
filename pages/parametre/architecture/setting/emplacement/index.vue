<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="content-body content-body-components">
      <ul id="tabSettingsEmplacement" class="nav nav-line" role="tablist">
        <li class="nav-item">
          <a
            id="equipement-tab"
            class="nav-link"
            :class="$route.query.tab === 1 ? 'active' : ''"
            data-toggle="tab"
            href="#equipement"
            role="tab"
            aria-controls="equipement"
            aria-selected="true"
            >Equipement</a
          >
        </li>
        <li class="nav-item">
          <a
            id="type-equipement-tab"
            class="nav-link"
            :class="$route.query.tab === 2 ? 'active' : ''"
            data-toggle="tab"
            href="#type-equipement"
            role="tab"
            aria-controls="type-equipement"
            aria-selected="false"
            >Types d'équipement</a
          >
        </li>
        <li class="nav-item">
          <a
            id="type-emplacement-tab"
            class="nav-link"
            :class="$route.query.tab === 3 ? 'active' : ''"
            data-toggle="tab"
            href="#type-emplacement"
            role="tab"
            aria-controls="type-emplacement"
            aria-selected="false"
            >Types d'emplacement</a
          >
        </li>
      </ul>
      <div id="tabSettingsEmplacementContent" class="tab-content mg-t-20">
        <div
          id="equipement"
          class="tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="equipement-tab"
        >
          <ListeEquipement
            v-if="!archive.equipement"
            :equipements="equipements"
            @archivage="archive.equipement = true"
          />
          <ListeEquipementArchive v-else @back="onBack(1)" />
        </div>
        <div
          id="type-equipement"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="type-equipement-tab"
        >
          <ListeTypequipement
            v-if="!archive.typEquipement"
            :marches="marches"
            :types="typEquipement"
            @archivage="archive.typEquipement = true"
          />
          <ListeTypequipementArchive v-else @back="onBack(2)" />
        </div>
        <div
          id="type-emplacement"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="type-emplacement-tab"
        >
          <ListeTypemplacement
            v-if="!archive.typEmplacement"
            :marches="marches"
            :types="typEmplacement"
            @archivage="archive.typEmplacement = true"
          />
          <ListeTypemplacementArchive v-else @back="onBack(3)" />
        </div>
      </div>
      <SettingsEmplacementMenu :active-tab="$route.query.tab" />
    </div>
    <!-- content-right -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import ListeEquipement from '~/components/architecture/equipement/ListeEquipement.vue'
import ListeEquipementArchive from '~/components/architecture/equipement/ListeEquipementArchive.vue'
import ListeTypequipement from '~/components/architecture/typEquipement/ListeTypequipement.vue'
import ListeTypequipementArchive from '~/components/architecture/typEquipement/ListeTypequipementArchive.vue'
import ListeTypemplacement from '~/components/architecture/typEmplacement/ListeTypemplacement.vue'
import ListeTypemplacementArchive from '~/components/architecture/typEmplacement/ListeTypemplacementArchive.vue'
export default {
  components: {
    PartialBreadcrumb,
    ListeEquipement,
    ListeEquipementArchive,
    ListeTypequipement,
    ListeTypequipementArchive,
    ListeTypemplacement,
    ListeTypemplacementArchive,
  },
  data: () => ({
    liens: [
      { path: 'parametre/architecture', text: 'Architecture de marché' },
      { path: '#', text: "Options d'emplacement" },
    ],
    archive: {
      typEmplacement: false,
      typeEquipement: false,
      equipement: false,
    },
  }),
  computed: {
    ...mapGetters({
      typEmplacements: 'architecture/typEmplacement/types',
      typEquipements: 'architecture/typEquipement/types',
      equipements: 'architecture/equipement/equipements',
      marches: 'architecture/marche/marches',
    }),
  },
  created() {
    this.getTypesEmplacement()
    this.getTypesEquipement()
    this.getEquipements()
    this.getMarches()
  },
  methods: {
    ...mapActions({
      getTypesEmplacement: 'architecture/typEmplacement/getAll',
      getTypesEquipement: 'architecture/typEquipement/getAll',
      getEquipements: 'architecture/equipement/getAll',
      getMarches: 'architecture/marche/getAll',
    }),
    onBack(numero) {
      if (numero === 1) {
        this.archive.typEmplacement = false
        this.getTypesEmplacement()
      } else if (numero === 2) {
        this.archive.typeEquipement = false
        this.getTypesEquipement()
      } else if (numero === 3) {
        this.archive.equipement = false
        this.getEquipements()
      }
    },
  },
}
</script>
<style></style>
