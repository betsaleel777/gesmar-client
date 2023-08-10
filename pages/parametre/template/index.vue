<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-tabs v-model="tabIndex" content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab title="Gabaris de Contrat" :title-link-class="linkClass(0)">
          <ListeTermeContrat :marches="marches" />
        </b-tab>
      </b-tabs>
    </div>
    <!-- content-right -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import ListeTermeContrat from '~/components/template/ListeTermeContrat.vue'
export default {
  components: {
    PartialBreadcrumb,
    ListeTermeContrat,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Gabaris de documents' }],
    tabIndex: 0,
  }),
  computed: {
    ...mapGetters({
      marches: 'architecture/marche/marches',
    }),
  },
  mounted() {
    this.getSites()
  },
  methods: {
    ...mapActions({
      getSites: 'architecture/marche/getAll',
    }),
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
