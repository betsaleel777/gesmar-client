<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="content-body content-body-components">
      <b-tabs
        v-model="tabIndex"
        content-class="mt-4"
        active-nav-item-class="font-weight-bold"
      >
        <b-overlay :show="$fetchState.pending" rounded="sm">
          <b-tab
            title="Equipements"
            :active="tab === 1"
            :title-link-class="linkClass(0)"
          >
            <ListeEquipement
              v-if="!archive.equipement"
              :equipements="equipements"
              @archivage="archive.equipement = true"
            />
            <ListeEquipementArchive v-else @back="onBack(1)" />
          </b-tab>
          <b-tab
            title="Types d'équipement"
            :active="tab === 2"
            :title-link-class="linkClass(1)"
            ><ListeTypequipement
              v-if="!archive.typEquipement"
              :marches="marches"
              :types="typEquipements"
              @archivage="archive.typEquipement = true" />
            <ListeTypequipementArchive v-else @back="onBack(2)"
          /></b-tab>
          <b-tab
            title="Types d'emplacement"
            :active="tab === 3"
            :title-link-class="linkClass(2)"
            ><ListeTypemplacement
              v-if="!archive.typEmplacement"
              :marches="marches"
              :types="typEmplacements"
              @archivage="archive.typEmplacement = true" />
            <ListeTypemplacementArchive v-else @back="onBack(3)"
          /></b-tab>
        </b-overlay>
      </b-tabs>
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
      { path: '/parametre/architecture', text: 'Architecture de marché' },
      { path: '#', text: "Options d'emplacement" },
    ],
    archive: {
      typEmplacement: false,
      typEquipement: false,
      equipement: false,
    },
    tabIndex: 0,
  }),
  fetch() {
    this.getTypesEmplacement()
    this.getTypesEquipement()
    this.getEquipements()
    this.getMarches()
  },
  computed: {
    ...mapGetters({
      typEmplacements: 'architecture/typEmplacement/types',
      typEquipements: 'architecture/typEquipement/types',
      equipements: 'architecture/equipement/equipements',
      marches: 'architecture/marche/marches',
    }),
    tab() {
      return parseInt(this.$route.query.tab)
    },
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
        this.archive.equipement = false
        this.getEquipements()
      } else if (numero === 2) {
        this.archive.typEquipement = false
        this.getTypesEquipement()
      } else if (numero === 3) {
        this.archive.typEmplacement = false
        this.getTypesEmplacement()
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
