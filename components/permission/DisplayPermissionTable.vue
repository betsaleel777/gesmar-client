<template>
  <b-overlay :show="$fetchState.pending" rounded="sm">
    <v-data-table
      :items="permissions"
      :headers="fields"
      :search="search"
      item-key="id"
      dense
      :items-per-page="7"
      locale="fr-FR"
      no-data-text="Aucune permission"
    >
      <template #top>
        <v-text-field v-model="search" label="rechercher"></v-text-field>
      </template>
    </v-data-table>
  </b-overlay>
</template>
<script>
export default {
  props: {
    permissionsDirectes: {
      type: Array,
      default: () => {
        return []
      },
    },
    permissionsRoles: {
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
      {
        value: 'status',
        text: 'Statut',
        align: 'left',
        sortable: true,
      },
    ],
    search: null,
    permissions: [],
  }),
  fetch() {
    const permDirectes = this.permissionsDirectes.map((permission) => {
      return { ...permission, status: 'directe' }
    })
    const permRoles = this.permissionsRoles.map((permission) => {
      return { ...permission, status: 'rôle' }
    })
    this.permissions = [...permDirectes, ...permRoles]
  },
}
</script>
<style></style>
