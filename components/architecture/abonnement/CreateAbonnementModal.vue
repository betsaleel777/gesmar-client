<template>
  <b-modal id="modalCreateAbonnement" @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création d'abonnement</h5>
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
            @change="getEmplacements"
          >
            <template #label>
              Choix du marché
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
          <v-autocomplete
            v-model="abonnement.emplacement_id"
            :items="emplacements"
            item-text="code"
            item-value="id"
            outlined
            dense
            :error="errors.emplacement_id.exist"
            :error-messages="errors.emplacement_id.message"
            @change="setEquipements"
          >
            <template #label>
              Emplacement
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
          <v-container v-if="liaisons.length > 0">
            <center><h6>Equipements déjà installés</h6></center>
            <v-simple-table class="mb-4" dense>
              <template #default>
                <thead>
                  <tr>
                    <th class="text-left">Code</th>
                    <th class="text-left">Type</th>
                    <th class="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="equipement in liaisons" :key="equipement.id">
                    <td>{{ equipement.code }}</td>
                    <td>{{ equipement.type.nom }}</td>
                    <td>
                      <v-chip v-if="equipement.abonnement === STATUS.subscribed" label color="error" small>{{
                        equipement.abonnement
                      }}</v-chip>
                      <v-chip v-else label color="success" small>
                        {{ equipement.abonnement }}
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-container>
          <v-autocomplete
            v-model="selected"
            :items="equipements"
            item-text="alias"
            item-value="id"
            return-object
            outlined
            dense
            multiple
            chips
            small-chips
            deletable-chips
            color="indigo"
            item-color="indigo"
            @change="getIndex"
          >
            <template #label>
              Selection des équipements
              <span class="red--text"><strong>* </strong></span>
            </template>
            <template #selection="data">
              <v-chip
                v-if="data.index < 2"
                small
                close
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
                @click:close="supprimer(data.item)"
              >
                <span>{{ data.item.code }}</span>
              </v-chip>
              <span v-if="data.index === 2" class="grey--text text-caption">
                (+{{ selected.length - 2 }} autres)
              </span>
            </template>
          </v-autocomplete>
          <v-row v-for="(equipement, index) in abonnement.equipements" :key="index">
            <v-col cols="6">
              <v-text-field v-model="equipement.nom" single-line dense readonly> </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="equipement.index_depart" dense readonly>
                <template #label> Index de départ </template>
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="equipement.index_autre"
                dense
                :error="errors.index_autre.exist"
                :error-messages="errors.index_autre.message"
              >
                <template #label>
                  Index actuel
                  <span class="red--text"><strong>* </strong></span></template
                >
              </v-text-field>
            </v-col>
          </v-row>
        </v-app>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="close">Fermer</button>
      <button type="button" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { isNull } from 'url/util'
import { mapActions } from 'vuex'
import { EQUIPEMENT } from '~/helper/constantes'
import { remove } from '~/helper/helpers'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
let message = ''
export default {
  props: {
    marches: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    equipements: [],
    emplacements: [],
    liaisons: [],
    selected: [],
    STATUS: EQUIPEMENT,
    abonnement: {
      site_id: null,
      emplacement_id: null,
      equipements: [],
    },
    errors: {
      site_id: { exist: false, message: null },
      emplacement_id: { exist: false, message: null },
      equipement_id: { exist: false, message: null },
      index_autre: { exist: false, message: null },
    },
  }),
  methods: {
    ...mapActions('architecture/abonnement', ['ajouter', 'getLastIndex']),
    ...mapActions('architecture/equipement', ['getGearsUnlinkedsubscribed']),
    ...mapActions('architecture/emplacement', ['getByMarcheWithGearsLinked']),
    save() {
      if (this.validable())
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
      else {
        this.$bvToast.toast(message, {
          title: "echèc de l'opération".toLocaleUpperCase(),
          variant: 'danger',
          solid: true,
        })
        message = ''
      }
    },
    reset() {
      this.abonnement = {
        site_id: null,
        emplacement_id: null,
        equipements: [],
      }
      this.equipements = []
      this.emplacements = []
      this.liaisons = []
      this.selected = []
      errorsInitialise(this.errors)
    },
    getEmplacements() {
      if (this.abonnement.site_id) {
        this.getByMarcheWithGearsLinked(this.abonnement.site_id).then(({ emplacements }) => {
          this.emplacements = emplacements
        })
      }
    },
    setEquipements() {
      const selected = this.emplacements.find(
        (emplacement) => emplacement.id === this.abonnement.emplacement_id
      )
      this.liaisons = selected?.equipements
      const equipement = this.liaisons.find((equipement) => equipement.abonnement !== this.STATUS.subscribed)
      this.equipements.push(equipement)
      this.getGearsUnlinkedsubscribed().then(({ equipements }) => {
        if (equipements.length > 0) this.equipements.push(...equipements)
      })
    },
    getIndex() {
      const gear = {}
      if (this.selected.length > 0) {
        const lastGear = this.selected.at(-1)
        gear.id = lastGear.id
        gear.nom = lastGear.code
        this.getLastIndex(gear.id).then(({ index }) => {
          gear.index_depart = index
          gear.index_autre = null
          this.abonnement.equipements.push(gear)
        })
      }
    },
    supprimer(item) {
      remove(item, this.selected, this.abonnement.equipements)
    },
    close() {
      this.reset()
      this.$bvModal.hide('modalCreateAbonnement')
    },
    validable() {
      return this.equipementsExist() && !this.indexMissing()
    },
    equipementsExist() {
      if (this.abonnement.equipements.length === 0) message += 'Aucun équipement sélectionné \n'
      return this.abonnement.equipements.length > 0
    },
    indexMissing() {
      const missing = this.abonnement.equipements.some(({ index_autre: index }) => isNull(index))
      if (missing) message += "valeur manquante de l'index actuel"
      return missing
    },
  },
}
</script>
<style scoped></style>
