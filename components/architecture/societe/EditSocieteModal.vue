<template>
  <b-modal id="modalEditSociete" v-model="dialog" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Modifier Société</h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="form-group my-1">
          <label class="form-label mg-t-10">Nom de la société<span class="text-danger">*</span></label>
          <input
            v-model="societe.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer le nom de la société"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <div class="form-group my-1">
          <label class="form-label mg-t-10">Sigle de la société<span class="text-danger">*</span></label>
          <input
            v-model="societe.sigle"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.sigle.exist }"
            placeholder="Entrer le sigle de la société"
          />
          <span v-if="errors.sigle.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.sigle.message }}</strong>
          </span>
        </div>
        <div class="form-group my-1">
          <label class="form-label mg-t-10">Siège<span class="text-danger">*</span></label>
          <input
            v-model="societe.siege"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.siege.exist }"
            placeholder="Entrer le siège de la société"
          />
          <span v-if="errors.siege.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.siege.message }}</strong>
          </span>
        </div>
        <div class="form-group my-1">
          <label class="form-label mg-t-10">Capital<span class="text-danger">*</span></label>
          <input
            v-model="societe.capital"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.siege.exist }"
            placeholder="Entrer le capital"
          />
          <span v-if="errors.capital.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.capital.message }}</strong>
          </span>
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="close">Fermer</button>
      <button type="button" class="btn btn-primary text-white" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  props: {
    current: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  data: () => ({
    societe: {
      nom: '',
      sigle: '',
      siege: '',
      capital: null,
    },
    errors: {
      nom: { exist: false, message: null },
      sigle: { exist: false, message: null },
      siege: { exist: false, message: null },
      capital: { exist: false, message: null },
    },
  }),
  computed: {
    ...mapGetters('architecture/marche', ['marches']),
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
    this.societe = Object.assign({}, this.current)
  },
  methods: {
    ...mapActions({ modifier: 'architecture/societe/modifier' }),
    save() {
      this.modifier(this.societe)
        .then(({ message }) => {
          this.$bvModal.hide('modalEditSociete')
          this.$root.$bvToast.toast(message, {
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
    close() {
      this.societe = {
        nom: '',
        sigle: '',
        siege: '',
        capital: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalEditSociete')
    },
  },
}
</script>
<style></style>
