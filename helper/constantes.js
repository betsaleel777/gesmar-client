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
const BORDEREAU = Object.freeze({
  cashed: 'encaissé',
  uncashed: 'non encaissé',
})
const COLLECTE = Object.freeze({
  collected: 'collecté',
  uncollected: 'non collecté',
})
const CONTRAT = Object.freeze({
  status: {
    validated: 'validé',
    onEndorsed: 'à signer',
    onValidated: 'à valider',
    attente: 'en attente',
    resilied: 'résilié',
  },
  uptodate: {
    yes: 'à jour',
    not: 'non à jour',
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
  checking: 'en examen',
})
const FERMETURE = Object.freeze({
  pending: 'en attente',
  withLoss: 'validé avec perte',
  withoutLoss: 'validé sans perte',
})
const GABARI = Object.freeze({
  onuse: 'en utilisation',
  unuse: 'pas utilisé',
})
const ENCAISSEMENT = Object.freeze({
  type: { espece: 'Espece', cheque: 'Cheque' },
  status: {},
})
const PERSONNE = Object.freeze({
  prospect: 'PROSPECT',
  client: 'CLIENT',
})
const REPARATION = Object.freeze({
  pending: 'en attente',
  progressing: 'en cours',
  finished: 'terminée',
})
const SUPERROLE = 'Super-admin'
const LINKS = Object.freeze({
  demande: 'Demandes',
  reception: 'Acceuil reception',
  prospect: 'Prospects',
  client: 'Clients',
  contrat: 'Contrats validés',
  abonnement: 'Abonnements',
})
module.exports = {
  EQUIPEMENT,
  ABONNEMENT,
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
  REPARATION,
  PERSONNE,
  FERMETURE,
  LINKS,
}
