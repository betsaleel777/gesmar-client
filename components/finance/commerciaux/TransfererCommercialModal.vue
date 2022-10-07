<template>
  <b-modal v-model="dialog" size="lg">
    <template #modal-header>
      <h5 class="modal-title text-primary">
        Transférer Des Tâches de Collecte au commercial {{ commercial.user.name }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <v-row>
          <v-col>
            <v-autocomplete
              v-model="transfert.commercial_id"
              :items="commercials"
              item-text="user.name"
              item-value="id"
              outlined
              dense
              :error="errors.commercial_id.exist"
              :error-messages="errors.commercial_id.message"
              @change="reset"
            >
              <template #label>
                Transférer les tâches du commercial ...
                <span class="red--text"><strong>* </strong></span>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete
              v-model="transfert.date"
              :items="dates"
              outlined
              dense
              :error="errors.date.exist"
              :error-messages="errors.date.message"
            >
              <template #label>
                Jour de collecte à transférer
                <span class="red--text"><strong>* </strong></span>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <center><h5>Liste des tâches à transférer</h5></center>
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Rechercher"
          class="mg-y-10"
          :debounce="500"
        ></b-form-input>
        <b-table
          id="table"
          class="table"
          hover
          small
          bordered
          primary-key="id"
          :items="attributions"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive
          empty-text="Tableau vide"
          show-empty
          :filter="filter"
          @filtered="onFiltered"
        >
          <template #cell(ordre)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(jour)="data">
            {{ $moment(data.item.jour).format('DD-MM-YYYY') }}
          </template>
          <template #cell(status)="data">
            <span :class="statusClass(data.item.status)">{{ data.item.status }}</span>
          </template>
          <template #empty="scope">
            <h6 class="text-center text-muted pd-y-10">
              {{ scope.emptyText }}
            </h6>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="right"
          size="sm"
          aria-controls="table"
        ></b-pagination>
      </v-app>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">
        Fermer
      </button>
      <button type="button" class="btn btn-primary" @click="save">Valider</button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { errorsInitialise, errorsWriting } from '~/helper/handleErrors'
import { ATTRIBUTION } from '~/helper/constantes'
export default {
  props: {
    commerciaux: {
      type: Array,
      required: true,
    },
    commercial: {
      type: Object,
      required: true,
    },
    value: Boolean,
  },
  data() {
    return {
      transfert: {
        id: this.commercial.id,
        commercial_id: null,
        date: null,
      },
      errors: {
        commercial_id: { exist: false, message: null },
        date: { exist: false, message: null },
      },
      fields: [
        'ordre',
        { key: 'emplacement.code', label: 'Emplacement', sortable: false },
        { key: 'jour', label: 'Date', sortable: true },
        {
          key: 'status',
          label: 'Statuts',
          tdClass: 'text-center',
          thClass: 'text-center',
        },
      ],
      filter: null,
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
    }
  },
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    commercials() {
      return this.commerciaux.filter(({ id }) => this.commercial.id !== id)
    },
    dates() {
      let datesDistincts = []
      if (this.transfert.commercial_id) {
        const commercial = this.commercials.find(({ id }) => id === this.transfert.commercial_id)
        const attributions = commercial.attributions.filter(({ status }) => status === ATTRIBUTION.uncashed) // obtenir les non encaissées
        datesDistincts = [...new Set(attributions.map(({ jour }) => jour))]
      }
      return datesDistincts
    },
    attributions() {
      let attributions = []
      if (this.transfert.date) {
        const commercial = this.commercials.find(({ id }) => id === this.transfert.commercial_id)
        attributions = commercial.attributions.filter(
          ({ jour, status }) => jour === this.transfert.date && status === ATTRIBUTION.uncashed
        )
      }
      return attributions
    },
  },
  methods: {
    ...mapActions('finance/attribution', ['transferer']),
    save() {
      if (this.validable())
        this.transferer(this.transfert)
          .then(({ message }) => {
            this.$root.$bvToast.toast(message, {
              title: 'succès de la création'.toLocaleUpperCase(),
              variant: 'success',
              solid: true,
            })
            this.dialog = false
          })
          .catch((err) => {
            const { data } = err.response
            if (data) {
              errorsInitialise(this.errors)
              errorsWriting(data.errors, this.errors)
            }
          })
      else
        this.$bvToast.toast('La liste des tâche de collecte à transférer ne doit pas être vide', {
          title: "echec de l'opération".toLocaleUpperCase(),
          variant: 'danger',
          solid: true,
        })
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    statusClass(value) {
      const classes = {
        [ATTRIBUTION.cashed]: 'badge badge-success-light',
        [ATTRIBUTION.uncashed]: 'badge badge-danger-light',
      }
      return classes[value]
    },
    reset() {
      errorsInitialise(this.errors)
    },
    validable() {
      return this.attributions.length > 0
    },
  },
}
</script>

<style lang="scss" scoped></style>
