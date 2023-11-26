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
import { mapActions, mapGetters } from 'vuex'
import { MODULES } from '~/helper/modules-types'
export default {
  emits: ['selected'],
  data: () => ({
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
    const { site_id: site, jour, commercial } = this.bordereau
    const { id } = commercial
    const infos = { commercial: id, jour, site }
    await this.getEmplacements(infos)
    this.selected = this.preselected
  },
  computed: {
    ...mapGetters({
      emplacements: MODULES.EMPLACEMENT.GETTERS.EMPLACEMENTS,
      bordereau: MODULES.BORDEREAU.GETTERS.BORDEREAU,
    }),
    preselected() {
      return this.bordereau.emplacements
    },
  },
  watch: {
    selected(newValue) {
      this.$emit('selected', newValue)
    },
  },
  methods: {
    ...mapActions({ getEmplacements: MODULES.EMPLACEMENT.ACTIONS.AUTO_BY_SITE }),
  },
}
</script>

<style lang="scss" scoped></style>
