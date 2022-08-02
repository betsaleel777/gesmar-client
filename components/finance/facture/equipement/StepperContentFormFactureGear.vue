<template>
  <v-container fluid>
    <v-form>
      <v-date-picker
        v-model="mois"
        locale="fr"
        landscape
        type="month"
        full-width
        class="mb-5"
      ></v-date-picker>
      <v-autocomplete
        v-model="selected"
        :items="clients"
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
        :loading="loading"
      >
        <template #label>
          Sélection des clients
          <span class="red--text"><strong>* </strong></span>
        </template>
        <template #progress>
          <v-progress-linear
            v-if="loading"
            indeterminate
            color="indigo"
            absolute
          ></v-progress-linear>
        </template>
      </v-autocomplete>
    </v-form>
    <v-btn small color="primary" @click="$emit('precedant')"> Précédent </v-btn>
    <v-btn small color="primary" @click="after"> Continuer </v-btn>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  emits: ['suivant', 'precedant'],
  data: () => ({
    clients: [],
    selected: [],
    loading: false,
    mois: new Date().toISOString().substring(0, 7),
  }),
  methods: {
    ...mapActions({
      getLastIndexForClient: 'architecture/abonnement/lastIndexClient',
    }),
    after() {
      console.log('suivant ...')
    },
  },
}
</script>
<style></style>
