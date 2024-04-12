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
export default {
  computed: {
    accesApplicationParametre() {
      return this.$gates.hasAnyPermission(`${application.edit}|${application.list}`)
    },
    accesCaisseParametre() {
      return this.$gates.hasAnyPermission(
        `${banque.global}|${banque.own}|${compte.global}|${compte.own}|${guichet.global}|${guichet.own}`
      )
    },
    accesGabarisParametre() {
      return this.$gates.hasAnyPermission(gabariContrat.list)
    },
    accesConfigurationParametre() {
      return this.$gates.hasAnyPermission(
        `${site.global}|${site.own}|${pavillon.global}|${pavillon.own}|${niveau.global}|${niveau.own}|${zone.global}|${zone.own}|${emplacement.global}|${emplacement.own}|${abonnement.global}|${abonnement.own}|${equipement.global}|${equipement.own}`
      )
    },
    accesUtilisateur() {
      return this.$gates.hasAnyPermission(
        `${utilisateur.global}|${utilisateur.own}|${role.global}|${role.own}|${permission.global}|${permission.own}`
      )
    },
    accesParametre() {
      return (
        this.accesApplicationParametre ||
        this.accesCaisseParametre ||
        this.accesGabarisParametre ||
        this.accesConfigurationParametre ||
        this.accesUtilisateur
      )
    },
    accesCaisseFinance() {
      return this.$gates.hasAnyPermission(
        `${fermeture.global}|${fermeture.own}|${ouverture.global}|${ouverture.own}|${encaissement.global}|${encaissement.own}`
      )
    },
    accesBordereauFinance() {
      return this.$gates.hasAnyPermission(
        `${bordereau.global}|${bordereau.own}|${commercial.global}|${commercial.own}`
      )
    },
    accesFactureFinance() {
      return this.$gates.hasAnyPermission(
        `${factureAnnexe.global}|${factureAnnexe.own}|${factureInitiale.global}|${factureInitiale.own}|${factureLoyer.global}|${factureLoyer.own}|${factureEquipement.global}|${factureEquipement.own}`
      )
    },
    accesFinance() {
      return this.accesCaisseFinance || this.accesBordereauFinance || this.accesFactureFinance
    },
    accesReception() {
      return this.$gates.hasAnyPermission(
        `${contrat.global}|${contrat.own}|${personne.global}|${personne.own}|${contrat.listValidGlobal}|${contrat.listValidOwn}`
      )
    },
    accesOrdonnancement() {
      return this.$gates.hasAnyPermission(`${ordonnancement.global}|${ordonnancement.own}`)
    },
    accesExploitation() {
      return this.accesOrdonnancement || this.accesReception
    },
  },
}
