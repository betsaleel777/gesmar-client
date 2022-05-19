<template>
  <div class="">
    <form v-if="!finish">
      <h5>Création automatique de zone, site "{{ marche.nom }}"</h5>
      <h5>
        Ce nombre de zone sera crée pour chaque niveau allant du
        {{ interval }}
      </h5>
      <div class="form-group">
        <label>Nombre de zones</label>
        <input
          v-model="nombre"
          class="form-control"
          :class="{ 'is-invalid': errors.nombre.exist }"
        />
        <span v-if="errors.nombre" class="invalid-feedback" role="alert">
          <strong>{{ errors.nombre.message }}</strong>
        </span>
      </div>
      <v-btn small color="primary" @click="$emit('precedant')">
        Précédent
      </v-btn>
      <v-btn small color="primary" @click="save"> Continuer </v-btn>
    </form>
    <b-jumbotron v-else>
      <template #lead>
        voulez-vous recommencer le processus de création automatique à nouveau ?
      </template>
      <hr class="my-4" />
      <b-button variant="success" @click="$emit('suivant', { step: 1 })"
        >Oui</b-button
      >
      <b-button variant="danger" @click="$emit('fermer')">Non</b-button>
    </b-jumbotron>
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
    interval: {
      type: String,
      required: true,
    },
    niveaux: {
      type: Array,
      required: true,
    },
  },
  emits: ['suivant', 'precedant', 'fermer'],
  data: () => ({
    nombre: null,
    finish: false,
    errors: {
      nombre: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions({
      push: 'architecture/zone/push',
    }),
    save() {
      const ids = this.niveaux.flat().map((niveau) => niveau.id)
      this.push({ niveaux: ids, nombre: this.nombre })
        .then(({ message }) => {
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
          this.finish = true
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
