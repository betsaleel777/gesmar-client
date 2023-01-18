<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="col-md-12 col-sm-12">
      <b-tabs v-model="tabIndex" lazy content-class="mt-7" active-nav-item-class="font-weight-bold">
        <b-tab title="Guichets" :title-link-class="linkClass(0)">
          <ListeGuichet />
        </b-tab>
        <b-tab title="Caissiers" :title-link-class="linkClass(1)">
          <ListeCaissier />
        </b-tab>
        <b-tab title="Comptes" :title-link-class="linkClass(2)">
          <ListeCompte />
        </b-tab>
        <b-tab title="Banques" :title-link-class="linkClass(3)">
          <ListeBanque />
        </b-tab>
      </b-tabs>
    </div>
    <!-- content-right -->
  </div>
</template>
<script>
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import ListeCaissier from '~/components/caisse/caissier/ListeCaissier.vue'
import ListeGuichet from '~/components/caisse/guichet/ListeGuichet.vue'
import ListeCompte from '~/components/caisse/compte/ListeCompte.vue'
import ListeBanque from '~/components/caisse/banque/ListeBanque.vue'
export default {
  components: {
    PartialBreadcrumb,
    ListeCaissier,
    ListeGuichet,
    ListeCompte,
    ListeBanque,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Caisse' }],
    tabIndex: 0,
  }),
  methods: {
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
