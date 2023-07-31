<template>
  <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
    <v-data-table
      :items="permissions"
      :value="selected"
      :headers="fields"
      :search="search"
      item-key="id"
      dense
      show-select
      :items-per-page="7"
      locale="fr-FR"
      no-data-text="Aucune permission"
      @item-selected="onRowsChanged"
      @toggle-select-all="allRowsChanged"
    >
      <template #top>
        <v-text-field v-model="search" label="rechercher"></v-text-field>
      </template>
      <template #[`item.data-table-select`]="{ item, isSelected, select }">
        <v-simple-checkbox
          v-if="ids.includes(item.id) && permissionsDisabled"
          :value="isSelected"
          :readonly="true"
          :disabled="true"
        ></v-simple-checkbox>
        <v-simple-checkbox
          v-else
          color="primary"
          :value="isSelected"
          @input="select($event)"
        ></v-simple-checkbox>
      </template>
    </v-data-table>
  </b-overlay>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
    permissionsDisabled: {
      type: Boolean,
      default: false,
    },
    directMode: {
      type: Boolean,
      default: false,
    },
    permissionsDirectes: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data: () => ({
    fields: [
      {
        value: 'name',
        text: 'Nom',
        align: 'left',
        sortable: true,
      },
    ],
    search: null,
    ids: [],
  }),
  fetch() {
    this.getAll()
    const directesIds = this.permissionsDirectes.map((elt) => elt.id)
    const permissionsViaRoles = this.selected.filter((elt) => !directesIds.includes(elt.id))
    this.ids = permissionsViaRoles.map((elt) => elt.id)
  },
  computed: {
    ...mapGetters('user-role/permission', ['permissions']),
    selected: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    ...mapActions('user-role/permission', ['getAll']),
    onRowsChanged({ item, value }) {
      if (value) {
        this.selected.push(item)
      } else {
        const index = this.selected.findIndex((element) => element.id === item.id)
        this.selected.splice(index, 1)
      }
    },
    allRowsChanged({ items, value }) {
      if (value) {
        items.forEach((item) => {
          this.selected.push(item)
        })
      } else {
        items.forEach((item) => {
          const index = this.selected.findIndex((element) => element.id === item.id)
          this.selected.splice(index, 1)
        })
      }
    },
  },
}
</script>
<style></style>
