<template>
  <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
    <ModalStepperArchitecture />
    <StructureTreemap :structure="structure" />
  </b-overlay>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import StructureTreemap from './StructureTreemap.vue'
export default {
  components: { StructureTreemap },
  async fetch() {
    await this.getStructure()
  },
  computed: {
    ...mapGetters({ structure: 'architecture/marche/structure' }),
  },
  methods: {
    ...mapActions({ getStructure: 'architecture/marche/getGeneralStructure' }),
  },
}
</script>

<style scoped></style>
