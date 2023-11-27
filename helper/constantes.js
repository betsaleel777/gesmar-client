const EQUIPEMENT = Object.freeze({
  subscribed: 'abonné',
  unsubscribed: 'non abonné',
  damaged: 'abimé',
  fixed: 'réparé',
  linked: 'lié',
  unlinked: 'non lié'
})
const EMPLACEMENT = Object.freeze({
  busy: 'occupé',
  free: 'libre',
  linked: 'lié',
  unlinked: 'non lié'
})
const ABONNEMENT = Object.freeze({
  progressing: 'en cours',
  stopped: 'résilié',
  error: 'erreur index'
})
const ORDONNANCEMENT = Object.freeze({
  paid: 'payé',
  unpaid: 'impayé'
})
const ANNEXE = Object.freeze({
  quotidien: 'par jour',
  mensuel: 'par mois',
  forfait: 'forfaitaire'
})
const BORDEREAU = Object.freeze({
  cashed: 'encaissé',
  uncashed: 'non encaissé'
})
const COLLECTE = Object.freeze({
  collected: 'collecté',
  uncollected: 'non collecté'
})
const CONTRAT = Object.freeze({
  status: {
    validated: 'validé',
    onEndorsed: 'à signer',
    onValidated: 'à valider',
    attente: 'en attente',
    resilied: 'résilié'
  },
  type: { annexe: 'annexe', bail: 'bail' }
})
const TYPEQUIPEMENT = Object.freeze({
  equipable: { with: 'avec équipement', without: 'sans équipement' }
})
const FACTURE = Object.freeze({
  status: {
    proforma: 'proforma',
    facture: 'facture',
    paid: 'soldée',
    unpaid: 'impayée'
  },
  type: {
    loyer: 'loyer',
    initiale: 'initiale',
    annexe: 'annexe',
    equipement: 'équipement'
  }
})
const MATRIMONIALE = Object.freeze({
  mariage: 'marier',
  concubinage: 'concubinage',
  celibat: 'celibataire'
})
const OUVERTURE = Object.freeze({
  confirmed: 'terminée',
  using: 'en cours'
})
const GABARI = Object.freeze({
  onuse: 'en utilisation',
  unuse: 'pas utilisé'
})
const ENCAISSEMENT = Object.freeze({
  type: {
    espece: 'Espece',
    cheque: 'Cheque'
  },
  status: {}
})
const REPARATION = Object.freeze({
  pending: 'en attente',
  progressing: 'en cours',
  finished: 'terminée'
})
const SUPERROLE = 'Super-admin'
module.exports = {
  EQUIPEMENT,
  ABONNEMENT,
  ANNEXE,
  TYPEQUIPEMENT,
  CONTRAT,
  FACTURE,
  EMPLACEMENT,
  ORDONNANCEMENT,
  BORDEREAU,
  MATRIMONIALE,
  OUVERTURE,
  GABARI,
  ENCAISSEMENT,
  SUPERROLE,
  COLLECTE,
  REPARATION
}
