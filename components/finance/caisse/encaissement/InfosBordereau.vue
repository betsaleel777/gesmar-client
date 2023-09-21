<template>
  <b-overlay :show="$fetchState.pending" spinner-variant="primary" rounded="sm">
    Bordereau information
    <pre>{{ bordereau }}</pre>
  </b-overlay>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  async fetch() {
    await this.getBordereau(this.id)
  },
  computed: {
    ...mapGetters({ bordereau: 'finance/bordereau/bordereau' }),
  },
  methods: {
    ...mapActions({ getBordereau: 'finance/bordereau/getForEncaissement' }),
  },
}
</script>

<style lang="scss" scoped></style>
