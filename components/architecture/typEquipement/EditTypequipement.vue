<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier le type d'équipement {{ type.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <div class="form-group">
          <label class="form-label mg-t-10">Nom complet<span class="text-danger">*</span></label>
          <input
            v-model="type.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer votre nom complet"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <b-form-group label-for="frais_penalite">
          <template #label>
            <span class="form-label">Frais de Pénalite <span class="text-danger">*</span></span>
          </template>
          <b-input-group>
            <b-form-input
              id="frais_penalite"
              v-model="type.frais_penalite"
              type="text"
              :class="{ 'is-invalid': errors.frais_penalite.exist }"
              class="form-control"
            />
            <b-input-group-append>
              <b-input-group-text class="bg-transparent font-weight-bold"> FCFA </b-input-group-text>
            </b-input-group-append>
            <span v-if="errors.frais_penalite.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.frais_penalite.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <b-form-group label-for="caution_abonnement">
          <template #label>
            <span class="form-label">Caution d'Abonnement <span class="text-danger">*</span></span>
          </template>
          <b-input-group>
            <b-form-input
              id="caution_abonnement"
              v-model="type.caution_abonnement"
              type="text"
              :class="{ 'is-invalid': errors.caution_abonnement.exist }"
              class="form-control"
            />
            <b-input-group-append>
              <b-input-group-text class="bg-transparent font-weight-bold"> FCFA </b-input-group-text>
            </b-input-group-append>
            <span v-if="errors.caution_abonnement.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.caution_abonnement.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <v-app>
          <v-autocomplete
            v-model="type.site_id"
            :items="sites"
            item-text="nom"
            item-value="id"
            outlined
            dense
            :error="errors.site_id.exist"
            :error-messages="errors.site_id.message"
          >
            <template #label>
              Choix du marché
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
        </v-app>
      </b-overlay>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">
        Fermer
      </button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
import { MODULES } from '~/helper/modules-types'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    submiting: false,
    type: {
      id: null,
      nom: '',
      frais_penalite: '',
      site_id: '',
      caution_abonnement: null,
    },
    errors: {
      nom: { exist: false, message: null },
      frais_penalite: { exist: false, message: null },
      site_id: { exist: false, message: null },
      caution_abonnement: { exist: false, message: null },
    },
  }),
  async fetch() {
    const { type } = await this.getOne(this.id)
    this.type = type
    await this.getSites()
  },
  computed: {
    ...mapGetters({ sites: MODULES.SITE.GETTERS.SITES }),
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    ...mapActions({
      modifier: MODULES.TYPE.EQUIPEMENT.ACTIONS.EDIT,
      getOne: MODULES.TYPE.EQUIPEMENT.ACTIONS.ONE,
      getSites: MODULES.SITE.ACTIONS.ALL,
    }),
    save() {
      this.submiting = true
      this.modifier(this.type)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          })
          this.dialog = false
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
        .finally(() => (this.submiting = false))
    },
  },
}
</script>
<style scoped></style>
