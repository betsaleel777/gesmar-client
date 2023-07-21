<template>
  <v-data-table
    :loading="$fetchState.pending"
    loading-text="En chargement ..."
    :headers="headers"
    :items="permissions"
    item-key="name"
    class="elevation-0"
    :search="search"
    dense
    locale="fr"
    no-data-text="Aucune permission"
  >
    <template #top>
      <v-text-field v-model="search" label="rechercher une permission" class="mx-4"></v-text-field>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    role: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    headers: [{ text: 'Nom', align: 'start', value: 'name' }],
    search: '',
  }),
  async fetch() {
    if (this.role) await this.getByRole(this.role)
  },
  computed: {
    ...mapGetters({ permissions: 'user-role/permission/permissions' }),
  },
  methods: {
    ...mapActions({ getByRole: 'user-role/permission/getByRole' }),
  },
}
</script>

<style scoped></style>
