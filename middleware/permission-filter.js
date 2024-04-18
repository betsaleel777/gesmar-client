import {
  application,
  gabariContrat,
  niveau,
  pavillon,
  zone,
  equipement,
  abonnement,
  emplacement,
  site,
  banque,
  compte,
  guichet,
  encaissement,
  fermeture,
  ouverture,
  commercial,
  bordereau,
  factureAnnexe,
  factureInitiale,
  factureLoyer,
  factureEquipement,
  contrat,
  personne,
  ordonnancement,
  utilisateur,
  role,
  permission,
} from '~/helper/permissions'
export default function ({ $gates, redirect, route }) {
  if (route.name === 'exploitation-reception') {
    return !$gates.hasAnyPermission(
      `${contrat.global}|${contrat.own}|${personne.global}|${personne.own}|${contrat.listValidGlobal}|${contrat.listValidOwn}`
    )
      ? redirect('/error', { code: 403 })
      : null
  } else if (route.name === 'exploitation-ordonnancement') {
    return !$gates.hasAnyPermission(`${ordonnancement.global}|${ordonnancement.own}`)
      ? redirect('/error', { code: 403 })
      : null
  } else if (route.name === 'finance-facture') {
    return !$gates.hasAnyPermission(
      `${factureAnnexe.global}|${factureAnnexe.own}|${factureInitiale.global}|${factureInitiale.own}|${factureLoyer.global}|
      ${factureLoyer.own}|${factureEquipement.global}|${factureEquipement.own}`
    )
      ? redirect('/error', { code: 403 })
      : null
  } else if (route.name === 'finance-bordereau') {
    return !$gates.hasAnyPermission(
      `${bordereau.global}|${bordereau.own}|${commercial.global}|${commercial.own}`
    )
      ? redirect('/error', { code: 403 })
      : null
  } else if (route.name === 'finance-caisse') {
    return !$gates.hasAnyPermission(
      `${fermeture.global}|${fermeture.own}|${ouverture.global}|${ouverture.own}|${encaissement.global}|${encaissement.own}`
    )
      ? redirect('/error', { code: 403 })
      : null
  } else if (route.name === 'parametre-architecture') {
    return !$gates.hasAnyPermission(
      `${site.global}|${site.own}|${pavillon.global}|${pavillon.own}|${niveau.global}|${niveau.own}|${zone.global}|${zone.own}|${emplacement.global}|${emplacement.own}|${abonnement.global}|${abonnement.own}|${equipement.global}|${equipement.own}`
    )
      ? redirect('/error', { code: 403 })
      : null
  } else if (route.name === 'parametre-utilisateur') {
    return !$gates.hasAnyPermission(
      `${utilisateur.global}|${utilisateur.own}|${role.global}|${role.own}|${permission.global}|${permission.own}`
    )
      ? redirect('/error', { code: 403 })
      : null
  } else if (route.name === 'parametre-caisse') {
    return !$gates.hasAnyPermission(
      `${banque.global}|${banque.own}|${compte.global}|${compte.own}|${guichet.global}|${guichet.own}`
    )
      ? redirect('/error', { code: 403 })
      : null
  } else if (route.name === 'parametre-template') {
    return !$gates.hasAnyPermission(gabariContrat.list) ? redirect('/error', { code: 403 }) : null
  } else if (route.name === 'parametre-application') {
    return !$gates.hasAnyPermission(`${application.edit}|${application.list}`)
      ? redirect('/error', { code: 403 })
      : null
  }
}
