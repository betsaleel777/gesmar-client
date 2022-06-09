<template>
  <b-modal id="modalCreateEquipement" @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Nouvel Equipement</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <b-form-group label-for="prix_unitaire">
          <template #label>
            <span class="form-label"
              >Prix Unitaire <span class="text-danger">*</span></span
            >
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
              <b-input-group-text class="bg-transparent font-weight-bold">
                FCFA
              </b-input-group-text>
            </b-input-group-append>
            <span
              v-if="errors.prix_unitaire.exist"
              class="invalid-feedback"
              role="alert"
            >
              <strong>{{ errors.prix_unitaire.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <b-form-group label-for="prix_fixe">
          <template #label>
            <span class="form-label"
              >Prix Fixe <span class="text-danger">*</span></span
            >
          </template>
          <b-input-group label-for="prix_fixe">
            <b-form-input
              id="prix_fixe"
              v-model="equipement.prix_fixe"
              type="text"
              :class="{ 'is-invalid': errors.prix_fixe.exist }"
              class="form-control"
            />
            <b-input-group-append>
              <b-input-group-text class="bg-transparent font-weight-bold">
                FCFA
              </b-input-group-text>
            </b-input-group-append>
            <span
              v-if="errors.prix_fixe.exist"
              class="invalid-feedback"
              role="alert"
            >
              <strong>{{ errors.prix_unitaire.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <b-form-group label-for="frais_facture">
          <template #label>
            <span class="form-label"
              >Frais Facture <span class="text-danger">*</span></span
            >
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
              <b-input-group-text class="bg-transparent font-weight-bold">
                FCFA
              </b-input-group-text>
            </b-input-group-append>
            <span
              v-if="errors.frais_facture.exist"
              class="invalid-feedback"
              role="alert"
            >
              <strong>{{ errors.prix_unitaire.message }}</strong>
            </span>
          </b-input-group>
        </b-form-group>
        <div class="form-group">
          <label class="form-label">Index</label>
          <input
            v-model="equipement.index"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.index.exist }"
            placeholder="Entrer l'index"
          />
          <span v-if="errors.index.exist" class="invalid-feedback" role="alert">
            <strong>{{ errors.index.message }}</strong>
          </span>
        </div>
        <v-app>
          <v-autocomplete
            v-model="equipement.type_equipement_id"
            :items="types"
            item-text="nom"
            item-value="id"
            outlined
            dense
            :error="errors.type_equipement_id.exist"
            :error-messages="errors.type_equipement_id.message"
            append-outer-icon="mdi-plus-thick"
            @click:append-outer="$bvModal.show('modalCreateTypequip')"
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
        </v-app>
        <CreateTypequipement :marches="marches" @pushed="onPushed" />
      </form>
    </template>
    <template #modal-footer>
      <button
        type="button"
        class="btn btn-warning"
        data-dismiss="modal"
        @click="reset"
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
import CreateTypequipement from '../typEquipement/CreateTypequipement.vue'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  components: { CreateTypequipement },
  props: {
    types: {
      type: Array,
      required: true,
    },
    marches: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    equipement: {
      prix_unitaire: '',
      prix_fixe: '',
      frais_facture: '',
      index: '',
      type_equipement_id: null,
      site_id: null,
    },
    errors: {
      prix_unitaire: { exist: false, message: null },
      prix_fixe: { exist: false, message: null },
      frais_facture: { exist: false, message: null },
      index: { exist: false, message: null },
      type_equipement_id: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions('architecture/equipement', ['ajouter']),
    save() {
      this.ajouter(this.equipement)
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateEquipement')
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
    },
    reset() {
      this.equipement = {
        prix_unitaire: '',
        prix_fixe: '',
        frais_facture: '',
        index: '',
        type_equipement_id: null,
        site_id: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateEquipement')
    },
    onPushed(id) {
      this.equipement.type_equipement_id = id
    },
  },
}
</script>
<style scoped>
.v-application--wrap {
  min-height: fit-content;
}
</style>
