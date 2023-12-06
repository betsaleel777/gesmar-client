<template>
  <v-container>
    <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
      <div v-if="!$fetchState.pending">
        <p><b>Code: </b>{{ bordereau.code }}</p>
        <p><b>Borderau datant du: </b>{{ bordereau.jour }}</p>
        <p v-if="bordereau.commercial"><b>Commercial: </b>{{ bordereau.commercial.user.name }}</p>
        <p><b>Total collecté: </b>{{ bordereau.total | currency }}</p>
      </div>
    </b-overlay>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { MODULES } from '~/helper/modules-types'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  fetch() {
    this.getBordereau(this.id)
  },
  computed: {
    ...mapGetters({ bordereau: MODULES.BORDEREAU.GETTERS.BORDEREAU }),
  },
  methods: {
    ...mapActions({ getBordereau: MODULES.BORDEREAU.ACTIONS.ONE_CASHOUT }),
  },
}
</script>

<style scoped></style>
