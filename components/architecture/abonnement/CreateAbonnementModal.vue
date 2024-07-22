<template>
  <b-modal v-model="dialog">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création d'abonnement</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending || submiting" spinner-variant="primary" rounded="sm">
        <v-app>
          <v-autocomplete
            v-model.number="abonnement.contrat_id"
            :items="contrats"
            item-text="code"
            item-value="id"
            outlined
            dense
            :error="errors.contrat_id.exist"
            :error-messages="errors.contrat_id.message"
            @change="displayDetails"
          >
            <template #label>
              Contrats
              <span class="red--text"><strong>* </strong></span>
            </template>
          </v-autocomplete>
          <v-container v-if="emplacement.equipements.length > 0">
            <center>
              <h6>Equipements déjà installés sur l'emplacement {{ emplacement.code }}</h6>
            </center>
            <v-simple-table dense>
              <template #default>
                <thead>
                  <tr>
                    <th class="text-left">Code</th>
                    <th class="text-left">Equipement</th>
                    <th class="text-left">Type</th>
                    <th class="text-left">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in emplacement.equipements" :key="row.id">
                    <td>{{ row.code }}</td>
                    <td>{{ row.nom }}</td>
                    <td>{{ row.type.nom.toUpperCase() }}</td>
                    <td>
                      <v-chip label :color="statusClass(row)" small>{{ row.abonnement }}</v-chip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-container>
          <v-autocomplete
            v-model="selected"
            :items="equipements"
            item-text="code"
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
              <span v-if="data.index === 2" class="grey--text text-caption"> (+{{ selected.length - 2 }} autres) </span>
            </template>
          </v-autocomplete>
          <v-row v-for="(equipement, index) in abonnement.equipements" :key="index">
            <v-col cols="6">
              <v-text-field v-model="equipement.nom" single-line dense readonly></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="equipement.index_depart" dense readonly>
                <template #label> Index de départ </template>
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="equipement.index_autre" dense :error="errors.index_autre.exist" :error-messages="errors.index_autre.message">
                <template #label>
                  Index actuel
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-app>
      </b-overlay>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">Fermer</button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">Valider</button>
    </template>
  </b-modal>
</template>
<script>
import { isNull } from 'url/util'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { MODULES } from '~/helper/modules-types'
import { EQUIPEMENT } from '~/helper/constantes'
import { errorHandling, remove } from '~/helper/helpers'
import modal from '~/mixins/modal'
let message = ''
export default {
  mixins: [modal],
  data: () => ({
    submiting: false,
    emplacement: { equipements: [] },
    selected: [],
    abonnement: {
      contrat_id: null,
      emplacement_id: null,
      equipements: [],
    },
    errors: {
      contrat_id: { exist: false, message: null },
      index_autre: { exist: false, message: null },
    },
  }),
  async fetch() {
    this.setEquipement([])
    try {
      await this.getContrats()
    } catch (error) {
      this.$notify({ text: error.response.data.message, type: 'error', title: 'Echec Autorisation' })
    }
  },
  computed: {
    ...mapGetters({
      contrats: MODULES.CONTRAT.BAIL.GETTERS.CONTRATS,
      equipements: MODULES.EQUIPEMENT.GETTERS.EQUIPEMENTS,
    }),
  },
  methods: {
    ...mapActions({
      ajouter: MODULES.ABONNEMENT.ACTIONS.ADD,
      getOne: MODULES.EMPLACEMENT.ACTIONS.ONE_FOR_GEAR,
      getContrats: MODULES.CONTRAT.BAIL.ACTIONS.WITH_GEAR,
      getEquipements: MODULES.EQUIPEMENT.ACTIONS.GEARS_UNLINKEDSUBCRIBED,
      getLastIndex: MODULES.ABONNEMENT.ACTIONS.LAST_INDEX,
    }),
    ...mapMutations({
      setEquipement: MODULES.EQUIPEMENT.MUTATIONS.SET,
      addEquipement: MODULES.EQUIPEMENT.MUTATIONS.ADD,
      setSubscribed: MODULES.EQUIPEMENT.MUTATIONS.SET_SUBSCRIBED,
    }),
    save() {
      if (this.validable()) {
        this.submiting = true
        this.ajouter(this.abonnement)
          .then(({ message }) => {
            this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
            this.dialog = false
          })
          .catch((err) => errorHandling(err.response, this.errors))
          .finally(() => (this.submiting = false))
      } else {
        this.$notify({ text: message, title: "echec de l'opération", type: 'error' })
        message = ''
      }
    },
    getIndex() {
      const gear = {}
      if (this.selected.length > 0) {
        const lastGear = this.selected.at(-1)
        gear.id = lastGear.id
        gear.nom = lastGear.code
        gear.site_id = lastGear.site_id
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
    statusClass(row) {
      return row.abonnement === EQUIPEMENT.subscribed ? 'error' : 'success'
    },
    async displayDetails() {
      if (this.abonnement.contrat_id) {
        const { emplacement_id: id } = this.contrats.find(({ id }) => id === this.abonnement.contrat_id)
        this.emplacement = await this.getOne(id)
        this.abonnement.emplacement_id = this.emplacement.id
        await this.getEquipements(id)
        const unsubscribed = this.emplacement.equipements.filter(({ abonnement }) => abonnement === EQUIPEMENT.unsubscribed)
        this.addEquipement(unsubscribed)
      }
    },
  },
}
</script>
<style></style>
