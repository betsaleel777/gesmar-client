import { site, pavillon, niveau, zone, emplacement, equipement, typeEquipement, typeEmplacement, serviceAnnexe } from '~/helper/permissions'
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
    displayEquipement() {
      return this.$gates.hasAnyPermission(`${typeEmplacement.global}|${typeEmplacement.own}`)
    },
    displayEmplacement() {
      return this.$gates.hasAnyPermission(`${typeEquipement.global}|${typeEquipement.own}`)
    },
    displayServices() {
      return this.$gates.hasAnyPermission(`${serviceAnnexe.global}|${serviceAnnexe.own}`)
    },
  },
}
