import {
  site,
  pavillon,
  niveau,
  zone,
  emplacement,
  equipement,
  abonnement,
  typeEquipement,
  typeEmplacement,
  serviceAnnexe,
} from '~/helper/permissions'
export default {
  computed: {
    disableSite() {
      return !this.$gates.hasAnyPermission(`${site.global}|${site.own}`)
    },
    disablePavillon() {
      return !this.$gates.hasAnyPermission(`${pavillon.global}|${pavillon.own}`)
    },
    disableNiveau() {
      return !this.$gates.hasAnyPermission(`${niveau.global}|${niveau.own}`)
    },
    disableZone() {
      return !this.$gates.hasAnyPermission(`${zone.global}|${zone.own}`)
    },
    disableEmplacement() {
      return !this.$gates.hasAnyPermission(`${emplacement.global}|${emplacement.own}`)
    },
    disableEquipement() {
      return !this.$gates.hasAnyPermission(`${equipement.global}|${equipement.own}`)
    },
    disableAbonnement() {
      return !this.$gates.hasAnyPermission(`${abonnement.global}|${abonnement.own}`)
    },
    disableSettingMenu() {
      return !this.$gates.hasAnyPermission(
        `${typeEquipement.global}|${typeEquipement.own}|${typeEmplacement.global}|${typeEmplacement.own}|${serviceAnnexe.global}|
        ${serviceAnnexe.own}`
      )
    },
  },
}
