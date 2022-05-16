<template>
  <div class="">
    <v-switch
      v-model="isNew"
      :label="isNew ? 'anciens marché' : 'nouveau marché'"
    ></v-switch>
    <v-autocomplete
      v-if="!isNew"
      v-model="selected"
      :items="marches"
      item-text="nom"
      item-value="id"
      outlined
      dense
      label="choix du marché"
    ></v-autocomplete>
    <form v-if="isNew">
      <v-row dense>
        <v-col cols="6" class="pa-2">
          <div class="form-group">
            <label>Nom</label>
            <input
              v-model="marche.nom"
              class="form-control"
              :class="{ 'is-invalid': errors.nom.exist }"
            />
            <span v-if="errors.nom" class="invalid-feedback" role="alert">
              <strong>{{ errors.nom.message }}</strong>
            </span>
          </div>
          <div class="form-group">
            <label>
              <span>Commune</span>
            </label>
            <input
              v-model="marche.commune"
              class="form-control"
              :class="{ 'is-invalid': errors.commune.exist }"
            />
            <span
              v-if="errors.commune.exist"
              class="invalid-feedback"
              role="alert"
            >
              <strong>{{ errors.commune.message }}</strong>
            </span>
          </div>
        </v-col>
        <v-col cols="6" class="pa-2">
          <div class="form-group">
            <label>
              <span>Ville</span>
            </label>
            <input
              v-model="marche.ville"
              class="form-control"
              :class="{ 'is-invalid': errors.ville.exist }"
            />
            <span
              v-if="errors.ville.exist"
              class="invalid-feedback"
              role="alert"
            >
              <strong>{{ errors.ville.message }}</strong>
            </span>
          </div>
          <div class="form-group">
            <label>
              <span>Pays</span>
            </label>
            <input
              v-model="marche.pays"
              class="form-control"
              :class="{ 'is-invalid': errors.pays.exist }"
            />
            <span
              v-if="errors.pays.exist"
              class="invalid-feedback"
              role="alert"
            >
              <strong>{{ errors.pays.message }}</strong>
            </span>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="form-group">
            <label>
              <span>Adresse Postale</span>
            </label>
            <input v-model="marche.postale" class="form-control" />
          </div>
        </v-col>
      </v-row>
    </form>
    <v-btn small color="primary" @click="save"> Continuer </v-btn>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { errorsInitialise, errorsWriting } from '~/helper/handleErrors'
export default {
  emits: ['suivant'],
  data: () => ({
    marche: {
      nom: '',
      commune: '',
      ville: '',
      pays: '',
      postale: '',
    },
    errors: {
      nom: { exist: false, message: null },
      commune: { exist: false, message: null },
      ville: { exist: false, message: null },
      pays: { exist: false, message: null },
    },
    isNew: true,
    selected: null,
  }),
  computed: {
    ...mapGetters({ marches: 'architecture/marche/marches' }),
  },
  created() {
    this.getAll().then(() => {
      if (this.marches.length > 0) this.isNew = false
    })
  },
  methods: {
    ...mapActions({
      getAll: 'architecture/marche/getAll',
      getOne: 'architecture/marche/getOne',
      push: 'architecture/marche/push',
    }),
    save() {
      if (this.isNew) {
        this.push(this.marche)
          .then(({ message, donnees }) => {
            this.$emit('suivant', { step: 2, donnees })
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
      } else if (this.selected) {
        this.getOne(this.selected).then(({ marche: donnees }) => {
          this.$emit('suivant', { step: 2, donnees })
        })
      } else {
        this.$bvToast.toast('Aucun marché selectionné', {
          title: "echec de l'opération".toLocaleUpperCase(),
          variant: 'danger',
          solid: true,
        })
      }
    },
  },
}
</script>
<style></style>
