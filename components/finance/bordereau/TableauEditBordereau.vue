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
  props: {
    preselected: {
      type: Array,
      required: true,
    },
    site: {
      type: Number,
      required: true,
    },
  },
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
    if (this.site) await this.getEmplacements(this.site)
    this.selected = this.preselected
  },
  computed: {
    ...mapGetters({ emplacements: MODULES.EMPLACEMENT.GETTERS.EMPLACEMENTS }),
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
