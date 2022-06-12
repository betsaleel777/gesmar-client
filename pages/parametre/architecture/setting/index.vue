<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="content-body">
      <b-tabs
        v-model="tabIndex"
        content-class="mt-4"
        active-nav-item-class="font-weight-bold"
      >
        <b-overlay :show="$fetchState.pending" rounded="sm">
          <b-tab
            title="Types d'équipement"
            :active="tab === 0"
            :title-link-class="linkClass(0)"
            ><ListeTypequipement
              v-if="!archive.typEquipement"
              :marches="marches"
              :types="typEquipements"
              @archivage="archive.typEquipement = true" />
            <ListeTypequipementArchive v-else @back="onBack(0)"
          /></b-tab>
          <b-tab
            title="Types d'emplacement"
            :active="tab === 1"
            :title-link-class="linkClass(1)"
            ><ListeTypemplacement
              v-if="!archive.typEmplacement"
              :marches="marches"
              :types="typEmplacements"
              @archivage="archive.typEmplacement = true" />
            <ListeTypemplacementArchive v-else @back="onBack(1)"
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
import ListeTypequipement from '~/components/architecture/typEquipement/ListeTypequipement.vue'
import ListeTypequipementArchive from '~/components/architecture/typEquipement/ListeTypequipementArchive.vue'
import ListeTypemplacement from '~/components/architecture/typEmplacement/ListeTypemplacement.vue'
import ListeTypemplacementArchive from '~/components/architecture/typEmplacement/ListeTypemplacementArchive.vue'
export default {
  components: {
    PartialBreadcrumb,

    ListeTypequipement,
    ListeTypequipementArchive,
    ListeTypemplacement,
    ListeTypemplacementArchive,
  },
  data: () => ({
    liens: [
      { path: '/parametre/architecture', text: 'Configuration de marché' },
      { path: '#', text: 'Options' },
    ],
    archive: {
      typEmplacement: false,
      typEquipement: false,
    },
    tabIndex: 0,
  }),
  fetch() {
    this.getTypesEmplacement()
    this.getTypesEquipement()
    this.getMarches()
  },
  computed: {
    ...mapGetters({
      typEmplacements: 'architecture/typEmplacement/types',
      typEquipements: 'architecture/typEquipement/types',
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
      getMarches: 'architecture/marche/getAll',
    }),
    onBack(numero) {
      if (numero === 0) {
        this.archive.typEquipement = false
        this.getTypesEquipement()
      } else {
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
