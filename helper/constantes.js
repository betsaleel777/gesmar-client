const EQUIPEMENT = { busy: 'occupé', free: 'libre', damaging: 'abimé' }
const ABONNEMENT = { progressing: 'en cours', stopped: 'résilié' }
const ANNEXE = {
  quotidien: 'par jour',
  mensuel: 'par mois',
  forfait: 'forfaitaire',
}
const CONTRAT = {
  status: {
    proforma: 'proforma',
    cours: 'en cours',
    attente: 'en attente',
  },
  type: { annexe: 'annexe', bail: 'bail' },
}
const TYPEQUIPEMENT = {
  equipable: { with: 'avec équipement', without: 'sans équipement' },
}
const FACTURE = {
  status: {
    schedulable: 'planifiable',
  },
  type: {
    loyer: 'loyer',
    initiale: 'initiale',
    annexe: 'annexe',
    equipement: 'équipement',
  },
}
module.exports = {
  EQUIPEMENT,
  ABONNEMENT,
  ANNEXE,
  TYPEQUIPEMENT,
  CONTRAT,
  FACTURE,
}
