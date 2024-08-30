<template>
  <div class="container-fluid">
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-tabs v-model="tabIndex" content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab title="Gabaris de Contrat" :title-link-class="linkClass(0)">
          <ListeTermeContrat :marches="marches" />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import ListeTermeContrat from '~/components/template/ListeTermeContrat.vue'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { ListeTermeContrat, PartialBreadcrumb },
  data: () => ({
    liens: [{ path: '#', text: 'Gabaris de documents' }],
    tabIndex: 0,
  }),
  async fetch() {
    await this.getSites()
  },
  computed: {
    ...mapGetters({ marches: MODULES.SITE.GETTERS.SITES }),
  },
  methods: {
    ...mapActions({ getSites: MODULES.SITE.ACTIONS.ALL }),
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-white', 'text-primary']
      } else {
        return ['bg-light', 'text-primary']
      }
    },
  },
}
</script>
<style></style>
