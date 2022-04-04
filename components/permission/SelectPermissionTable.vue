<template>
  <b-overlay :show="$fetchState.pending" rounded="sm">
    <v-app>
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
      >
        <template #top>
          <v-text-field v-model="search" label="rechercher"></v-text-field>
        </template>
      </v-data-table>
    </v-app>
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
  }),
  fetch() {
    this.getAll()
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
        const index = this.selected.findIndex(
          (element) => element.id === item.id
        )
        this.selected.splice(index, 1)
      }
      console.log(this.selected)
    },
  },
}
</script>
<style></style>
