<template>
  <b-overlay :show="$fetchState.pending" rounded="sm">
    <button type="button" class="btn btn-primary text-white" @click="$bvModal.show('structure')">
      Création d'architecture de marché
    </button>
    <ModalStepperArchitecture />
    <StructureTreemap :structure="structure" />
  </b-overlay>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ModalStepperArchitecture from './ModalStepperArchitecture.vue'
import StructureTreemap from './StructureTreemap.vue'
export default {
  components: {
    ModalStepperArchitecture,
    StructureTreemap,
  },
  fetch() {
    this.getStructure()
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
