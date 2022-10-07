<template>
  <b-modal v-model="dialog">
    <template #modal-header>
      <h5 class="modal-title text-primary">Facture initiale {{ modification.code }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form>
        <b-form-group label-for="avance">
          <template #label>
            <span class="form-label">Avance <span class="text-danger">*</span></span>
          </template>
          <b-input-group>
            <b-form-input
              id="avance"
              v-model="modification.avance"
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
              v-model="modification.caution"
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
              v-model="modification.pas_porte"
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
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">
        Fermer
      </button>
      <button type="button" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { errorsInitialise, errorsWriting } from '~/helper/handleErrors'
export default {
  props: {
    facture: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    modification: {
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
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  mounted() {
    this.modification.id = this.facture.id
    this.modification.code = this.facture.code
    this.modification.pas_porte = this.facture.pas_porte
    this.modification.caution = this.facture.caution
    this.modification.avance = this.facture.avance
  },
  methods: {
    ...mapActions('facture/initiale', ['modifier']),
    save() {
      this.modifier(this.modification)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
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
    },
  },
}
</script>

<style></style>
