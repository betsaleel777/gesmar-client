<template>
  <b-modal id="modalEditTypempl" v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">
        Modifier le type d'emplacement {{ type.nom }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <div class="form-group required">
          <label class="form-label mg-t-10">Nom complet</label>
          <input
            v-model="marche.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer votre nom complet"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
      </form>
    </template>
    <template #modal-footer>
      <button
        type="button"
        class="btn btn-warning"
        data-dismiss="modal"
        @click="close"
      >
        Fermer
      </button>
      <button type="button" class="btn btn-primary" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
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
    type: {
      nom: '',
    },
    errors: {
      nom: { exist: false, message: null },
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
    this.type.id = this.current.id
    this.type.nom = this.current.nom
  },
  methods: {
    ...mapActions({
      modifier: 'architecture/typEmplacement/modifier',
    }),
    save() {
      this.modifier(this.marche)
        .then(({ message }) => {
          this.$root.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
            autoHideDelay: 3000,
          })
          this.$bvModal.hide('modalEditTypempl')
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
      this.type = {
        nom: '',
      }
      errorsInitialise(this.errors)
      this.dialog = false
    },
  },
}
</script>
<style>
.v-application--wrap {
  min-height: fit-content;
}
</style>
