<template>
  <b-modal id="modalCreateAbonnement" @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Création d'abonnement
      </h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form v-if="!finish" ref="form">
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
            item-text="nom"
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
            <v-col cols="6">
              <v-autocomplete
                v-model="abonnement.equipement_id"
                :items="equipementsSet"
                item-text="nom"
                item-value="id"
                outlined
                dense
                :error="errors.equipement_id.exist"
                :error-messages="errors.equipement_id.message"
                @change="getIndex"
              >
                <template #label>
                  Emplacement
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="abonnement.index" outlined dense>
                <template #label>
                  Index
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-app>
      </form>
      <b-alert v-else show variant="info">
        <p>Voulez-vous créer à nouveau un autre abonnement ?</p>
        <hr />
        <p class="mb-0">
          <b-button variant="success" @click="reset">Oui</b-button>
          <b-button
            variant="danger"
            @click="$bvModal.hide('modalCreateAbonnement')"
            >Non</b-button
          >
        </p>
      </b-alert>
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
    cle: false,
    finish: false,
    equipementsSet: [],
    emplacementsSet: [],
    abonnements: {
      site_id: null,
      emplacement_id: null,
      equipement_id: null,
      index: '',
    },
    errors: {
      site_id: { exist: false, message: null },
      emplacement_id: { exist: false, message: null },
      equipement_id: { exist: false, message: null },
      index: { exist: false, message: null },
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
          this.finish = true
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
        index: '',
      }
      errorsInitialise(this.errors)
    },
    setDependencies() {
      if (this.abonnement.site_id) {
        this.equipementsSet = this.equipements.filter(
          (equipement) => equipement.site_id === this.abonnement.site_id
        )
        this.emplacementsSet = this.emplacements.filter(
          (emplacement) =>
            emplacement.zone.niveau.pavillon.site_id === this.abonnement.site_id
        )
        this.cle = !this.cle
      }
    },
    getIndex() {
      if (this.abonnement.equipement_id) {
        this.getLastIndex(this.abonnement.equipement_id).then(({ index }) => {
          this.abonnement.index = index
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
<style>
.v-application--wrap {
  min-height: fit-content;
}
</style>
