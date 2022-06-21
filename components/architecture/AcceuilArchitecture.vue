<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      @click="$bvModal.show('structure')"
    >
      Création d'architecture de marché
    </button>
    <ModalStepperArchitecture />
    <StructureTreemap :structure="structure" />
  </div>
</template>

<script>
import ModalStepperArchitecture from './ModalStepperArchitecture.vue'
import StructureTreemap from './StructureTreemap.vue'
export default {
  components: {
    ModalStepperArchitecture,
    StructureTreemap,
  },
  props: {
    structure: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped></style>
