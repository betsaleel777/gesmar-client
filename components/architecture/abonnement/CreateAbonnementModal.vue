<template>
  <b-modal id="modalCreateAbonnement" @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Création d'abonnement
      </h5>
      <button type="button" class="close" aria-label="Close" @click="close">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form ref="form">
        <v-app>
          <v-autocomplete
            v-model="abonnement.site_id"
            :items="marches"
            item-text="nom"
            item-value="id"
            outlined
            dense
            :error="errors.site_id.exist"
            :error-messages="errors.site_id.message"
            @change="setDependencies"
          >
            <template #label>
              Choix du marché
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
          <v-autocomplete
            v-model="abonnement.emplacement_id"
            :items="emplacementsSet"
            item-text="code"
            item-value="id"
            outlined
            dense
            :error="errors.emplacement_id.exist"
            :error-messages="errors.emplacement_id.message"
          >
            <template #label>
              Emplacement
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
          <v-row>
            <v-col cols="4">
              <v-autocomplete
                v-model="abonnement.equipement_id"
                :items="equipementsSet"
                item-text="code"
                item-value="id"
                outlined
                dense
                :error="errors.equipement_id.exist"
                :error-messages="errors.equipement_id.message"
                @change="getIndex"
              >
                <template #label>
                  Equipement
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="abonnement.index_depart"
                outlined
                dense
                :error="errors.index_depart.exist"
                :error-messages="errors.index_depart.message"
                readonly
              >
                <template #label>
                  Index de départ
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="abonnement.index_autre"
                outlined
                dense
                hint="valeur si différent"
              >
                <template #label> Autre Index </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-app>
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
import { EQUIPEMENT } from '~/helper/constantes'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  props: {
    equipements: {
      type: Array,
      required: true,
    },
    marches: {
      type: Array,
      required: true,
    },
    emplacements: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    equipementsSet: [],
    emplacementsSet: [],
    abonnement: {
      site_id: null,
      emplacement_id: null,
      equipement_id: null,
      index_depart: '',
      index_autre: '',
    },
    errors: {
      site_id: { exist: false, message: null },
      emplacement_id: { exist: false, message: null },
      equipement_id: { exist: false, message: null },
      index_depart: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions('architecture/abonnement', ['ajouter', 'getLastIndex']),
    save() {
      this.ajouter(this.abonnement)
        .then(({ message }) => {
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
          this.$bvModal.hide('modalCreateAbonnement')
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
      this.abonnement = {
        site_id: null,
        emplacement_id: null,
        equipement_id: null,
        index_depart: '',
        index_autre: '',
      }
      this.equipementsSet = []
      this.emplacementsSet = []
      errorsInitialise(this.errors)
    },
    setDependencies() {
      if (this.abonnement.site_id) {
        this.equipementsSet = this.equipements.filter(
          (equipement) =>
            equipement.site_id === this.abonnement.site_id &&
            equipement.status === EQUIPEMENT.free
        )
        this.emplacementsSet = this.emplacements.filter(
          (emplacement) => emplacement.site_id === this.abonnement.site_id
        )
      }
    },
    getIndex() {
      if (this.abonnement.equipement_id) {
        this.getLastIndex(this.abonnement.equipement_id).then(({ index }) => {
          this.abonnement.index_depart = index
        })
      }
    },
    close() {
      this.reset()
      this.$bvModal.hide('modalCreateAbonnement')
    },
  },
}
</script>
<style scoped>
.v-application--wrap {
  min-height: fit-content;
}
</style>
