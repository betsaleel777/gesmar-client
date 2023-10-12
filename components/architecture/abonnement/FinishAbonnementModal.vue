<template>
  <b-modal id="modalFinishAbonnement" v-model="dialog" size="sm">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Résiliation abonnement: <strong>{{ abonnement.code }}</strong>
      </h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <v-app>
          <v-text-field
            v-model="abonnement.index_fin"
            outlined
            dense
            :error="errors.index_fin.exist"
            :error-messages="errors.index_fin.message"
          >
            <template #label>
              Index de fin
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-text-field>
        </v-app>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="close">Fermer</button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
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
      required: true
    },
    value: Boolean
  },
  data: () => ({
    submiting: false,
    abonnement: {
      id: null,
      index_fin: null
    },
    errors: {
      index_fin: { exist: false, message: null }
    }
  }),
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  mounted() {
    this.abonnement.id = this.current.id
    this.abonnement.code = this.current.code
  },
  methods: {
    ...mapActions('architecture/abonnement', ['resilier']),
    save() {
      this.submiting = true
      this.resilier(this.abonnement)
        .then(({ message }) => {
          this.$bvToast.toast(message, {
            title: 'résilié avec succès'.toLocaleUpperCase(),
            variant: 'success',
            solid: true
          })
          this.close()
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
    close() {
      this.abonnement = {
        id: null,
        index_fin: null
      }
      errorsInitialise(this.errors)
      this.dialog = false
    }
  }
}
</script>
<style scoped></style>
