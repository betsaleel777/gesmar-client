<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Modifier Compte</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <div class="form-group required">
          <label class="form-label mg-t-10">Nom de Banque<span class="text-danger">*</span></label>
          <input
            v-model="compte.nom"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.nom.exist }"
            placeholder="Entrer le nom de la banque"
          />
          <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.nom.message }}</strong>
          </span>
        </div>
        <div class="form-group required">
          <label class="form-label mg-t-10">Code du compte<span class="text-danger">*</span></label>
          <input
            v-model="compte.code"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.code.exist }"
            placeholder="Entrer le code du modalCreateCompte"
          />
          <span v-if="errors.code.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.code.message }}</strong>
          </span>
        </div>
        <v-app>
          <v-autocomplete
            v-model="compte.site_id"
            :items="marches"
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
    compte: {
      nom: '',
      code: '',
      site_id: null,
    },
    errors: {
      nom: { exist: false, message: null },
      code: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
  }),
  async fetch() {
    const { compte } = await this.getOne(this.id)
    this.compte = compte
    await this.getSites()
  },
  computed: {
    ...mapGetters({ marches: MODULES.SITE.GETTERS.SITES }),
  },
  methods: {
    ...mapActions({
      modifier: MODULES.COMPTE.ACTIONS.EDIT,
      getOne: MODULES.COMPTE.ACTIONS.ONE,
      getSites: MODULES.SITE.ACTIONS.ALL,
    }),
    save() {
      this.submiting = true
      this.modifier(this.compte)
        .then(({ message }) => {
          this.dialog = false
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
        .finally(() => (this.submiting = false))
    },
  },
}
</script>
<style></style>
