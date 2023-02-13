<template>
  <v-container fluid>
    <v-radio-group v-model="payable" row @change="onChange">
      <v-radio label="Espèce" :value="1"></v-radio>
      <v-radio label="Cheque" :value="2"></v-radio>
    </v-radio-group>
    <div v-show="payable === 1">
      <v-text-field readonly label="montant à payer" :value="montant" suffix="FCFA"></v-text-field>
      <v-text-field
        v-model.number="encaissement.versement"
        :error="errors.versement.exist"
        :error-messages="errors.versement.message"
        suffix="FCFA"
      >
        <template #label>
          montant versé
          <span class="red--text"><strong>* </strong></span>
        </template>
      </v-text-field>
      <v-text-field readonly label="monnaie à rendre" :value="monnaie" suffix="FCFA"></v-text-field>
    </div>
    <div v-show="payable === 2">
      <v-text-field
        readonly
        label="montant à payer"
        outlined
        dense
        :value="montant"
        suffix="FCFA"
      ></v-text-field>
      <v-autocomplete
        v-model="encaissement.banque_id"
        :items="banques"
        item-text="nom"
        item-value="id"
        outlined
        dense
        append-icon="mdi-plus-thick"
        :error="errors.banque_id.exist"
        :error-messages="errors.banque_id.message"
        @click:append="$bvModal.show('modalCreateBanque')"
      >
        <template #label>
          Choix de la banque
          <span class="red--text"><strong>* </strong></span>
        </template>
      </v-autocomplete>
      <v-autocomplete
        v-model="encaissement.compte_id"
        :items="comptes"
        item-text="code"
        item-value="id"
        :error="errors.compte_id.exist"
        :error-messages="errors.compte_id.message"
        outlined
        dense
      >
        <template #label>
          Compte de dépot
          <span class="red--text"><strong>* </strong></span>
        </template>
      </v-autocomplete>
      <v-text-field
        v-model="encaissement.numero"
        outlined
        dense
        :error="errors.numero.exist"
        :error-messages="errors.numero.message"
        suffix="FCFA"
      >
        <template #label>
          Numéro du cheque
          <span class="red--text"><strong>* </strong></span>
        </template>
      </v-text-field>
      <v-text-field
        v-model.number="encaissement.valeur"
        :error="errors.valeur.exist"
        :error-messages="errors.valeur.message"
        outlined
        dense
        suffix="FCFA"
        label="Montant du cheque"
      >
      </v-text-field>
      <CreateBanqueModal />
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CreateBanqueModal from '~/components/caisse/banque/CreateBanqueModal.vue'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  components: { CreateBanqueModal },
  props: {
    ordonnancement: {
      type: Object,
      required: true,
    },
    mode: {
      type: Number,
      required: true,
    },
    messages: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  emits: ['statusButton'],
  data() {
    return {
      payable: this.mode,
      montant: Number(this.ordonnancement.total),
      monnaie: null,
      errors: {
        versement: { exist: false, message: null },
        valeur: { exist: false, message: null },
        banque_id: { exist: false, message: null },
        compte_id: { exist: false, message: null },
        numero: { exist: false, message: null },
      },
    }
  },
  computed: {
    ...mapGetters({ banques: 'caisse/banque/banques', comptes: 'caisse/compte/comptes' }),
    encaissement: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  watch: {
    'encaissement.versement'(value) {
      const versement = Number(value)
      if (this.encaissement.mode === 1) {
        if (versement === 0) {
          this.monnaie = null
        } else if (versement < this.montant) {
          this.monnaie = null
          this.$emit('statusButton', false)
        } else {
          this.monnaie = versement - this.montant
          this.$emit('statusButton', true)
        }
      }
    },
  },
  mounted() {
    this.encaissement.mode = this.payable
    if (this.mode === 1) this.encaissement.montant = this.montant
    errorsInitialise(this.errors)
    if (Object.keys(this.messages).length !== 0) errorsWriting(this.messages.errors, this.errors)
    this.getBanques()
    this.getComptes()
  },
  methods: {
    ...mapActions({
      getComptes: 'caisse/compte/getAll',
      getBanques: 'caisse/banque/getAll',
    }),
    onChange() {
      errorsInitialise(this.errors)
      this.monnaie = null
      this.encaissement.valeur = null
      this.encaissement.versement = null
      this.encaissement.mode = this.payable
    },
  },
}
</script>

<style scoped></style>
