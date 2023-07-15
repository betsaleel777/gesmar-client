const EQUIPEMENT = Object.freeze({
  subscribed: 'abonné',
  unsubscribed: 'non abonné',
  damaged: 'abimé',
  fixed: 'réparé',
  linked: 'lié',
  unlinked: 'non lié',
})
const EMPLACEMENT = Object.freeze({
  busy: 'occupé',
  free: 'libre',
  linked: 'lié',
  unlinked: 'non lié',
})
const ABONNEMENT = Object.freeze({
  progressing: 'en cours',
  stopped: 'résilié',
  error: 'erreur index',
})
const ORDONNANCEMENT = Object.freeze({
  paid: 'payé',
  unpaid: 'impayé',
})
const ANNEXE = Object.freeze({
  quotidien: 'par jour',
  mensuel: 'par mois',
  forfait: 'forfaitaire',
})
const ATTRIBUTION = Object.freeze({
  cashed: 'encaissé',
  uncashed: 'non encaissé',
})
const CONTRAT = Object.freeze({
  status: {
    validated: 'validé',
    onEndorsed: 'à signer',
    onValidated: 'à valider',
    attente: 'en attente',
  },
  type: { annexe: 'annexe', bail: 'bail' },
})
const TYPEQUIPEMENT = Object.freeze({
  equipable: { with: 'avec équipement', without: 'sans équipement' },
})
const FACTURE = Object.freeze({
  status: {
    proforma: 'proforma',
    facture: 'facture',
    paid: 'soldée',
    unpaid: 'impayée',
  },
  type: {
    loyer: 'loyer',
    initiale: 'initiale',
    annexe: 'annexe',
    equipement: 'équipement',
  },
})
const MATRIMONIALE = Object.freeze({
  mariage: 'marier',
  concubinage: 'concubinage',
  celibat: 'celibataire',
})
const OUVERTURE = Object.freeze({
  confirmed: 'terminée',
  using: 'en cours',
})
const GABARI = Object.freeze({
  onuse: 'en utilisation',
  unuse: 'pas utilisé',
})
const ENCAISSEMENT = Object.freeze({
  type: {
    espece: 'Espece',
    cheque: 'Cheque',
  },
  status: {},
})
module.exports = {
  EQUIPEMENT,
  ABONNEMENT,
  ANNEXE,
  TYPEQUIPEMENT,
  CONTRAT,
  FACTURE,
  EMPLACEMENT,
  ORDONNANCEMENT,
  ATTRIBUTION,
  MATRIMONIALE,
  OUVERTURE,
  GABARI,
  ENCAISSEMENT,
}
