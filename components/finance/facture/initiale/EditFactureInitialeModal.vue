<template>
  <b-modal v-model="dialog">
    <template #modal-header>
      <h5 class="modal-title text-primary">Facture initiale {{ facture.code }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <form>
          <b-form-group label-for="avance">
            <template #label>
              <span class="form-label">Avance <span class="text-danger">*</span></span>
            </template>
            <b-input-group>
              <b-form-input
                id="avance"
                v-model="facture.avance"
                type="text"
                :class="{ 'is-invalid': errors.avance.exist }"
                class="form-control"
                number
              />
              <b-input-group-append>
                <b-input-group-text class="bg-transparent font-weight-bold"> MOIS </b-input-group-text>
              </b-input-group-append>
              <span v-if="errors.avance.exist" class="invalid-feedback" role="alert">
                <strong>{{ errors.avance.message }}</strong>
              </span>
            </b-input-group>
          </b-form-group>
          <b-form-group label-for="caution">
            <template #label>
              <span class="form-label">Caution <span class="text-danger">*</span></span>
            </template>
            <b-input-group>
              <b-form-input
                id="caution"
                v-model="facture.caution"
                type="text"
                :class="{ 'is-invalid': errors.caution.exist }"
                class="form-control"
                number
              />
              <b-input-group-append>
                <b-input-group-text class="bg-transparent font-weight-bold"> MOIS </b-input-group-text>
              </b-input-group-append>
              <span v-if="errors.caution.exist" class="invalid-feedback" role="alert">
                <strong>{{ errors.caution.message }}</strong>
              </span>
            </b-input-group>
          </b-form-group>
          <b-form-group label-for="pas_porte">
            <template #label>
              <span class="form-label">Pas de porte <span class="text-danger">*</span></span>
            </template>
            <b-input-group>
              <b-form-input
                id="pas_porte"
                v-model="facture.pas_porte"
                type="text"
                :class="{ 'is-invalid': errors.pas_porte.exist }"
                class="form-control"
                number
              />
              <b-input-group-append>
                <b-input-group-text class="bg-transparent font-weight-bold"> FCFA </b-input-group-text>
              </b-input-group-append>
              <span v-if="errors.pas_porte.exist" class="invalid-feedback" role="alert">
                <strong>{{ errors.pas_porte.message }}</strong>
              </span>
            </b-input-group>
          </b-form-group>
        </form>
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
import { mapActions } from 'vuex'
import { errorHandling } from '~/helper/helpers'
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    submiting: false,
    facture: {
      id: null,
      code: null,
      pas_porte: null,
      avance: null,
      caution: null,
    },
    errors: {
      pas_porte: { exist: false, message: null },
      avance: { exist: false, message: null },
      caution: { exist: false, message: null },
    },
  }),
  async fetch() {
    const { facture } = await this.getOne(this.id)
    this.facture = facture
  },
  methods: {
    ...mapActions({ getOne: 'facture/initiale/getOne', modifier: 'facture/initiale/modifier' }),
    save() {
      this.submiting = true
      this.modifier(this.facture)
        .then(({ message }) => {
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
          this.dialog = false
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
    },
  },
}
</script>

<style></style>
