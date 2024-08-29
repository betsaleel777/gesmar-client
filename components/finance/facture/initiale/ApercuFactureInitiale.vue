<template>
  <div class="card-body">
    <div class="row">
      <div class="col-sm-12 tx-center d-md-block align-content-center">
        <span><h3 class="tx-normal tx-spacing--2 text-uppercase">Facture de premier décompte</h3></span>
      </div>
      <!-- col -->
      <div class="col-sm-8 col-lg-9 mg-t-0 mg-sm-t-0 mg-md-t-0">
        <label class="content-label">informations du client</label>
        <h6 class="tx-15 mg-b-10">{{ facture.personne.alias }}</h6>
        <p class="mb-0">
          {{ facture.personne.ville }} <span v-if="facture.personne.adresse">,{{ facture.personne.adresse }}</span>
        </p>
        <p class="mb-0">Tel: {{ facture.personne.contact }}</p>
        <p v-if="facture.personne.email" class="mb-0">Email: {{ facture.personne.email }}</p>
        <p>Emplacement {{ facture.contrat.emplacement.code }} {{ facture.contrat.emplacement.type.nom }}</p>
      </div>
      <!-- col -->
      <div class="col-sm-4 col-lg-3 mg-t-0">
        <label class="content-label">Informations de la facture</label>
        <ul class="list-unstyled lh-7 pl-0">
          <li class="d-flex justify-content-between">
            <span
              >Code: <span class="text-muted">{{ facture.code }}</span>
            </span>
          </li>
          <li class="d-flex justify-content-between">
            <span
              >Code du contrat: <span class="text-muted">{{ facture.contrat.code }}</span>
            </span>
          </li>
          <li class="d-flex justify-content-between">
            <span
              >Emise le: <span class="text-muted">{{ $moment(facture.created_at).format('llll') }}</span>
            </span>
          </li>
          <li class="d-flex justify-content-between">
            <span
              >Durée contrat:
              <span class="text-muted"
                >{{ $moment(facture.contrat.debut).format('DD-MM-YYYY') }} au {{ $moment(facture.contrat.fin).format('DD-MM-YYYY') }}
              </span></span
            >
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
            <th class="wd-20p">Titre</th>
            <th class="wd-40p d-none d-sm-table-cell">Description</th>
            <th class="tx-center">QTE</th>
            <th class="tx-right">Prix unitaire</th>
            <th class="tx-right">Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tx-nowrap">Pas de porte</td>
            <td class="d-none d-sm-table-cell tx-color-03">Définir ici ce que c'est q'un pas de porte</td>
            <td class="tx-center">1</td>
            <td class="tx-right">{{ facture.pas_porte | currency }}</td>
            <td class="tx-right">{{ facture.pas_porte | currency }}</td>
          </tr>
          <tr>
            <td class="tx-nowrap">Frais de dossier</td>
            <td class="d-none d-sm-table-cell tx-color-03">Définir ici ce à quoi serve les frais de dossier</td>
            <td class="tx-center">1</td>
            <td class="tx-right">{{ facture.frais_dossier | currency }}</td>
            <td class="tx-right">{{ facture.frais_dossier | currency }}</td>
          </tr>
          <tr>
            <td class="tx-nowrap">Frais d'aménagement</td>
            <td class="d-none d-sm-table-cell tx-color-03">Définir ici ce à quoi serve les frais d'amenagement</td>
            <td class="tx-center">1</td>
            <td class="tx-right">{{ facture.frais_amenagement | currency }}</td>
            <td class="tx-right">{{ facture.frais_amenagement | currency }}</td>
          </tr>
          <tr>
            <td class="tx-nowrap">Caution</td>
            <td class="d-none d-sm-table-cell tx-color-03">Expliquer le montant de la caution</td>
            <td class="tx-center">1</td>
            <td class="tx-right">{{ facture.caution | currency }}</td>
            <td class="tx-right">{{ facture.caution | currency }}</td>
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
            <strong>{{ facture.total | currency }}</strong>
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
}
</script>
