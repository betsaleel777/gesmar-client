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
  </div>
</template>

<script>
import ModalStepperArchitecture from './ModalStepperArchitecture.vue'
export default {
  components: {
    ModalStepperArchitecture,
  },
}
</script>

<style scoped></style>
