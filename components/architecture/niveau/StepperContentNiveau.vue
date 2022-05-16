<template>
  <div class="">
    <form>
      <h5>Création automatique de niveau, site "{{ marche.nom }}"</h5>
      <h5>
        Ce nombre de niveau sera crée pour chaque pavillon allant du
        {{ intervalText }}
      </h5>
      <div class="form-group">
        <label>Nombre de niveaux</label>
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
    pavillons: {
      type: Array,
      required: true,
    },
  },
  emits: ['suivant', 'precedant'],
  data: () => ({
    intervalText: null,
    nombre: null,
    errors: {
      nombre: { exist: false, message: null },
    },
  }),
  mounted() {
    this.intervalText = `${this.pavillons[0].nom} à ${
      this.pavillons.at(-1).nom
    }`
  },
  methods: {
    ...mapActions({
      push: 'architecture/niveau/push',
    }),
    save() {
      const ids = this.pavillons.map((pavillon) => pavillon.id)
      this.push({ pavillons: ids, nombre: this.nombre })
        .then(({ message, donnees }) => {
          this.$emit('suivant', { step: 4, donnees })
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
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
