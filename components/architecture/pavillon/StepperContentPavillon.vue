<template>
  <div class="">
    <form>
      <h4>
        Création automatique de pavillons pour le site: "{{ marche.nom }}"
      </h4>
      <div class="form-group">
        <label>Nombre de pavillons<span class="text-danger">*</span></label>
        <input
          v-model="nombre"
          class="form-control"
          :class="{ 'is-invalid': errors.nombre.exist }"
        />
        <span v-if="errors.nombre" class="invalid-feedback" role="alert">
          <strong>{{ errors.nombre.message }}</strong>
        </span>
      </div>
    </form>
    <v-btn small color="primary" @click="$emit('precedant')"> Précédent </v-btn>
    <v-btn small color="primary" @click="save"> Continuer </v-btn>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { errorsInitialise, errorsWriting } from '~/helper/handleErrors'
export default {
  props: {
    marche: {
      type: Object,
      required: true,
    },
  },
  emits: ['suivant', 'precedant'],
  data: () => ({
    nombre: null,
    errors: {
      nombre: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions({
      push: 'architecture/pavillon/push',
    }),
    save() {
      this.push({ id: this.marche.id, nombre: this.nombre })
        .then(({ message, donnees }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          })
          const interval = `${donnees[0].nom} à ${donnees.at(-1).nom}`
          this.$emit('suivant', { step: 3, donnees, interval })
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
    },
  },
}
</script>
<style></style>
