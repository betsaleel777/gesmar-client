<template>
  <div>
    <div class="mg-y-10">
      <ListeTermesContratAnnexe
        v-if="!archive.annexe"
        :termes="termesAnnexes"
        :marches="marches"
        @archivage="archive.annexe = true"
      />
      <ListeTermesContratAnnexeArchive v-else @back="onBack(1)" />
    </div>
    <div class="mg-y-10">
      <ListeTermeContratBail
        v-if="!archive.bail"
        :termes="termesBails"
        :marches="marches"
        @archivage="archive.bail = true"
      />
      <ListeTermeContratBailArchive v-else @back="onBack(2)" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListeTermesContratAnnexe from './annexe/ListeTermesContratAnnexe.vue'
import ListeTermesContratAnnexeArchive from './annexe/ListeTermesContratAnnexeArchive.vue'
import ListeTermeContratBailArchive from './bail/ListeTermeContratBailArchive.vue'
import ListeTermeContratBail from './bail/ListeTermeContratBail.vue'
export default {
  components: {
    ListeTermeContratBail,
    ListeTermeContratBailArchive,
    ListeTermesContratAnnexe,
    ListeTermesContratAnnexeArchive,
  },
  props: {
    marches: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    archive: {
      bail: false,
      annexe: false,
    },
  }),
  computed: {
    ...mapGetters({
      termesBails: 'template/terme-bail/termes',
      termesAnnexes: 'template/terme-annexe/termes',
    }),
  },
  mounted() {
    this.getTermesAnnexes()
    this.getTermesBails()
  },
  methods: {
    ...mapActions({
      getTermesBails: 'template/terme-bail/getAll',
      getTermesAnnexes: 'template/terme-annexe/getAll',
    }),
    onBack(numero) {
      if (numero === 1) {
        this.archive.annexe = false
        this.getTermesAnnexes()
      } else if (numero === 2) {
        this.archive.bail = false
        this.getTermesBails()
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
