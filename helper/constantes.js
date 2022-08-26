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
})
const ANNEXE = Object.freeze({
  quotidien: 'par jour',
  mensuel: 'par mois',
  forfait: 'forfaitaire',
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
    paid: 'payée',
    unpaid: 'impayée',
  },
  type: {
    loyer: 'loyer',
    initiale: 'initiale',
    annexe: 'annexe',
    equipement: 'équipement',
  },
})
module.exports = {
  EQUIPEMENT,
  ABONNEMENT,
  ANNEXE,
  TYPEQUIPEMENT,
  CONTRAT,
  FACTURE,
  EMPLACEMENT,
}
