<template>
  <b-modal v-model="dialog" scrollable>
    <template #modal-header>
      <h5 class="modal-title text-primary">Modifier l'equipement {{ equipement.nom }}</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <b-form-group label-for="prix_unitaire">
          <template #label>
            <span class="form-label">Prix Unitaire <span class="text-danger">*</span></span>
          </template>
          <b-input-group>
            <b-form-input
              id="prix_unitaire"
              v-model="equipement.prix_unitaire"
              type="text"
              :class="{ 'is-invalid': errors.prix_unitaire.exist }"
              class="form-control"
            />
            <b-input-group-append>
              <b-input-group-text class="bg-transparent font-weight-bold"> FCFA </b-input-group-text>
            </b-input-group-append>
            <span v-if="errors.prix_unitaire.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.prix_unitaire.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <b-form-group label-for="prix_fixe">
          <template #label>
            <span class="form-label">Prix Fixe <span class="text-danger">*</span></span>
          </template>
          <b-input-group label-for="prix_fixe">
            <b-form-input id="prix_fixe" v-model="equipement.prix_fixe" type="text" :class="{ 'is-invalid': errors.prix_fixe.exist }" class="form-control" />
            <b-input-group-append>
              <b-input-group-text class="bg-transparent font-weight-bold"> FCFA </b-input-group-text>
            </b-input-group-append>
            <span v-if="errors.prix_fixe.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.prix_unitaire.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <b-form-group label-for="frais_facture">
          <template #label>
            <span class="form-label">Frais Facture <span class="text-danger">*</span></span>
          </template>
          <b-input-group>
            <b-form-input
              id="frais_facture"
              v-model="equipement.frais_facture"
              type="text"
              :class="{ 'is-invalid': errors.frais_facture.exist }"
              class="form-control"
            />
            <b-input-group-append>
              <b-input-group-text class="bg-transparent font-weight-bold"> FCFA </b-input-group-text>
            </b-input-group-append>
            <span v-if="errors.frais_facture.exist" class="invalid-feedback" role="alert">
              <strong>{{ errors.prix_unitaire.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <div class="form-group">
          <label class="form-label">Index</label>
          <input v-model="equipement.index" type="text" class="form-control" :class="{ 'is-invalid': errors.index.exist }" placeholder="Entrer l'index" />
          <span v-if="errors.index.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.index.message }}</strong>
          </span>
        </div>
        <v-app>
          <v-autocomplete
            v-model="equipement.type_equipement_id"
            v-permission:unless.disabled="permissions.create"
            :items="types"
            item-text="nom"
            item-value="id"
            outlined
            dense
            :error="errors.type_equipement_id.exist"
            :error-messages="errors.type_equipement_id.message"
            :append-outer-icon="hasCreateTypePermission ? 'mdi-plus-thick' : false"
            @click:append-outer="createType = true"
          >
            <template #label>
              Type d'équipement
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
          <v-autocomplete
            v-model="equipement.site_id"
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
          <h6 v-if="equipement.emplacement">Lié actuellement à l'emplacement {{ equipement.emplacement.code }}</h6>
          <v-autocomplete v-model="equipement.emplacement_id" :items="emplacements" item-text="code" item-value="id" outlined dense :loading="loading">
            <template #label> Choix d'un nouvel emplacement </template>
            <template #progress>
              <v-progress-linear v-if="loading" indeterminate color="primary" absolute></v-progress-linear>
            </template>
          </v-autocomplete>
        </v-app>
        <CreateTypequipement v-if="createType" v-model="createType" @pushed="onPushed" />
      </b-overlay>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">Fermer</button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CreateTypequipement from '../typEquipement/CreateTypequipement.vue'
import { MODULES } from '~/helper/modules-types'
import { typeEquipement } from '~/helper/permissions'
import { errorHandling } from '~/helper/helpers'
import modal from '~/mixins/modal'
export default {
  components: { CreateTypequipement },
  mixins: [modal],
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    submiting: false,
    equipement: {
      nom: '',
      prix_unitaire: '',
      prix_fixe: '',
      frais_facture: '',
      index: '',
      type_equipement_id: null,
      site_id: null,
      emplacement_id: null,
    },
    emplacements: [],
    loading: false,
    createType: false,
    errors: {
      prix_unitaire: { exist: false, message: null },
      prix_fixe: { exist: false, message: null },
      frais_facture: { exist: false, message: null },
      index: { exist: false, message: null },
      type_equipement_id: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
    permissions: typeEquipement,
  }),
  async fetch() {
    const { equipement } = await this.getOne(this.id)
    this.equipement = equipement
    const { emplacements } = await this.getEmplacement(this.equipement.site_id)
    this.emplacements = emplacements
    try {
      await this.getMarches()
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
    try {
      await this.getTypes()
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
  },
  computed: {
    ...mapGetters({ marches: MODULES.SITE.GETTERS.SITES, types: MODULES.TYPE.EQUIPEMENT.GETTERS.TYPES }),
    hasCreateTypePermission() {
      return this.$gates.hasPermission(this.permissions.create)
    },
  },
  methods: {
    ...mapActions({
      getMarches: MODULES.SITE.ACTIONS.ALL,
      getOne: MODULES.EQUIPEMENT.ACTIONS.ONE,
      modifier: MODULES.EQUIPEMENT.ACTIONS.EDIT,
      getEmplacement: MODULES.EMPLACEMENT.ACTIONS.BY_MARCHE,
      getTypes: MODULES.TYPE.EQUIPEMENT.ACTIONS.ALL,
    }),
    save() {
      this.submiting = true
      this.modifier(this.equipement)
        .then(({ message }) => {
          this.$notify({ text: message, type: 'success', title: "succès de l'opération" })
          this.dialog = false
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
    },
    onPushed(id) {
      this.equipement.type_equipement_id = id
    },
  },
}
</script>
<style scoped></style>
