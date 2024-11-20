<template>
  <div class="card-body">
    <div class="row">
      <div class="col-sm-12 tx-center d-md-block align-content-center">
        <span
          ><h3 class="tx-spacing--2 text-uppercase tx-bold">Facture d'abonnement #{{ facture.code }}</h3></span
        >
      </div>
      <!-- col -->
      <div class="col-sm-8 col-lg-9 mg-t-0 mg-sm-t-0 mg-md-t-0">
        <label class="content-label">informations du client</label>
        <h6 class="tx-15 mg-b-10">{{ abonnement.personne.alias }}</h6>
        <p class="mb-0">
          {{ abonnement.personne.ville }} <span v-if="abonnement.personne.adresse">,{{ abonnement.personne.adresse }}</span>
        </p>
        <p class="mb-0">Tel: {{ abonnement.personne.contact }}</p>
        <p v-if="abonnement.personne.email" class="mb-0">Email: {{ abonnement.personne.email }}</p>
        <p class="mb-0"><span class="tx-medium">Abonnement fait le</span>: {{ $moment(abonnement.created_at).format('DD-MM-YYYY') }}</p>
        <p><span class="tx-medium">Code d'abonnement</span>: {{ abonnement.code }}</p>
      </div>
      <!-- col -->
      <div class="col-sm-4 col-lg-3 mg-t-0">
        <label class="content-label">Informations emplacement</label>
        <ul class="list-unstyled lh-7 pl-0">
          <h6 class="tx-15 mg-b-10 tx-uppercase">
            Emplacement {{ abonnement.emplacement.code }} {{ abonnement.emplacement.type.nom }} ({{ abonnement.emplacement.type.prefix }})
          </h6>
          <li class="d-flex justify-content-between">
            <span
              >Zone: <span class="text-muted">{{ abonnement.emplacement.zone.nom }}</span>
            </span>
          </li>
          <li class="d-flex justify-content-between">
            <span
              >Niveau: <span class="text-muted">{{ abonnement.emplacement.niveau.nom }}</span>
            </span>
          </li>
          <li class="d-flex justify-content-between">
            <span
              >Pavillon: <span class="text-muted">{{ abonnement.emplacement.pavillon.nom }}</span>
            </span>
          </li>
          <li class="d-flex justify-content-between">
            <span
              >Emise le: <span class="text-muted">{{ $moment(facture.created_at, 'DD-MM-YYYY').format('llll') }}</span>
            </span>
          </li>
        </ul>
      </div>
      <!-- col -->
    </div>
    <!-- row -->

    <div class="table-responsive mg-t-25">
      <table class="table table-invoice bd-b">
        <thead>
          <tr>
            <th class="wd-30p">Equipement</th>
            <th class="tx-center">Index de départ</th>
            <th class="tx-right">Caution d'abonnement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ abonnement.equipement.code }}</td>
            <td class="tx-center">{{ abonnement.index_depart }}</td>
            <td class="tx-right">{{ facture.caution_abonnement | currency }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="row justify-content-between mg-t-25">
      <div class="col-sm-6 col-lg-6 order-2 order-sm-0 mg-t-40 mg-sm-t-0">
        <label class="content-label mg-b-10">Notes Additionnelles</label>
        <p class="tx-sm">Facture imprimée par {{ user.name }}, {{ $moment().format('llll') }}</p>
      </div>
      <!-- col -->
      <div class="col-sm-4 col-lg-4 order-1 order-sm-0">
        <ul class="list-unstyled lh-7">
          <li class="d-flex justify-content-between">
            <strong>Total</strong>
            <strong>{{ facture.caution_abonnement | currency }}</strong>
          </li>
        </ul>
        <button class="btn btn-block btn-primary d-print-none btn-brand-02" @click="$emit('printed')">Imprimer</button>
      </div>
      <!-- col -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    facture: { type: Object, required: true },
  },
  emits: ['printed'],
  computed: {
    abonnement() {
      return this.facture.abonnement
    },
  },
}
</script>
