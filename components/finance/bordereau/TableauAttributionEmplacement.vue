<template>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Rechercher"
      single-line
      hide-details
      dense
    ></v-text-field>
    <v-data-table
      v-model="selected"
      dense
      :headers="headers"
      :search="search"
      :items="emplacements"
      show-select
      no-data-text="aucun emplacement"
      :items-per-page="10"
      :loading="$fetchState.pending"
    ></v-data-table>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { MODULES } from '~/helper/modules-types'
export default {
  props: {
    zones: {
      type: Array,
      required: true,
    },
  },
  emits: ['selected'],
  data: () => ({
    emplacements: [],
    selected: [],
    headers: [
      { text: 'Code', value: 'code' },
      { text: 'Pavillons', value: 'pavillon.nom' },
      { text: 'Niveaux', value: 'niveau.nom' },
      { text: 'Zones', value: 'zone.nom' },
      { text: 'Sites', value: 'site.nom' },
    ],
    search: null,
  }),
  async fetch() {
    const emplacements = await this.getByZones(this.zones)
    this.emplacements = emplacements
    this.selected = []
  },
  watch: {
    selected(newValue) {
      this.$emit('selected', newValue)
    },
  },
  methods: {
    ...mapActions({ getByZones: MODULES.EMPLACEMENT.ACTIONS.BY_ZONE }),
  },
}
</script>

<style lang="scss" scoped></style>
