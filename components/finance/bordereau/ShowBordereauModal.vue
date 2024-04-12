<template>
  <b-modal v-model="dialog" hide-footer size="lg" scrollable>
    <template #modal-header>
      <h5 v-if="bordereau.code" id="archiver" class="modal-title text-primary">
        Detail du bordereau {{ bordereau.code }}
      </h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
        <div v-if="!$fetchState.pending" class="container-fluid">
          <div class="d-flex align-items-baseline justify-content-between">
            <span class="text-muted">Bordereau pour la date du {{ bordereau.jour }}</span>
            <span class="text-muted"
              >Crée par le commercial <b>{{ bordereau.commercial.user.name }}</b></span
            >
          </div>
          <ListeShowEmplacement :emplacements="bordereau.emplacements" />
        </div>
      </b-overlay>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ListeShowEmplacement from './ListeShowEmplacement.vue'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { ListeShowEmplacement },
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: Boolean,
  },
  async fetch() {
    await this.getOne(this.id)
  },
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    ...mapGetters({ bordereau: MODULES.BORDEREAU.GETTERS.BORDEREAU }),
    infosBordereau() {
      const { id, jour, code } = this.bordereau
      return { id, jour, code }
    },
  },
  methods: {
    ...mapActions({ getOne: MODULES.BORDEREAU.ACTIONS.ONE }),
  },
}
</script>
