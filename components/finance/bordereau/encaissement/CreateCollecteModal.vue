<template>
  <b-modal v-model="dialog">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Collecte des places de marché</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <v-app>
        <v-autocomplete
          v-model="commercial"
          :items="commerciaux"
          return-object
          outlined
          dense
          item-text="name"
          item-value="id"
          :error="errors.commercial.exist"
          :error-messages="errors.commercial.message"
        >
          <template #label>
            Commercial
            <span class="red--text"><strong>* </strong></span>
          </template>
        </v-autocomplete>
        <v-autocomplete
          v-model="bordereau"
          return-object
          :items="bordereaux"
          item-text="code"
          item-value="id"
          outlined
          dense
          :error="errors.bordereau.exist"
          :error-messages="errors.bordereau.message"
        >
          <template #label>
            Bordereaux
            <span class="red--text"><strong>* </strong></span>
          </template>
        </v-autocomplete>
        <v-autocomplete
          v-model="attribution"
          :items="attributions"
          item-text="emplacement.code"
          item-value="emplacement_id"
          return-object
          outlined
          dense
          :error="errors.attribution_id.exist"
          :error-messages="errors.attribution_id.message"
        >
          <template #label>
            Emplacements
            <span class="red--text"><strong>* </strong></span>
          </template>
          <template #item="data">
            {{ data.item.emplacement.code }}
          </template>
        </v-autocomplete>
        <v-row>
          <v-col>
            <v-text-field v-model="nombre" label="Nombre de jours" outlined dense></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="total collecté"
              :value="totalCollect | currency"
              readonly
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-app>
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
import { ATTRIBUTION } from '~/helper/constantes'
export default {
  props: {
    value: Boolean,
  },
  data: () => ({
    submiting: false,
    commercial: null,
    bordereau: null,
    attribution: null,
    nombre: 1,
    errors: {
      commercial: { exist: false, message: null },
      bordereau: { exist: false, message: null },
      attribution_id: { exist: false, message: null },
    },
  }),
  computed: {
    ...mapGetters({
      commerciaux: 'finance/commercial/commerciaux',
    }),
    totalCollect() {
      if (this.attribution) return this.nombre * this.attribution.emplacement.loyer
      return 0
    },
    bordereaux() {
      if (this.commercial)
        return this.commercial.bordereaux.filter(({ status }) => status === ATTRIBUTION.uncashed)
      return []
    },
    attributions() {
      if (this.bordereau)
        return this.commercial.attributions.filter(
          ({ jour, status }) => jour === this.bordereau.date_attribution && status === ATTRIBUTION.uncashed
        )
      return []
    },
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
    this.getCommerciaux()
  },
  methods: {
    ...mapActions({
      getCommerciaux: 'finance/commercial/getForSelect',
      ajouter: 'finance/collecte/ajouter',
    }),
    save() {
      this.submiting = true
      const collecte = {
        montant: this.totalCollect,
        nombre: this.nombre,
        attribution_id: this.attribution?.id,
        commercial: this.commercial?.id,
        bordereau: this.bordereau?.id,
      }
      this.ajouter(collecte)
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
        .finally(() => (this.submiting = false))
    },
  },
}
</script>
<style></style>
