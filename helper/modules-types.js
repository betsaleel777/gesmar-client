const reparationRoot = 'exploitation/reparation'
const bordereauRoot = 'finance/bordereau'
const emplacementRoot = 'architecture/emplacement'
const technicienRoot = 'exploitation/technicien'
const siteRoot = 'architecture/marche'
const zoneRoot = 'architecture/zone'
const commercialRoot = 'finance/commercial'
const niveauRoot = 'architecture/niveau'
const pavillonRoot = 'architecture/pavillon'

export const MODULES = Object.freeze({
  REPARATION: Object.freeze({
    ALL: reparationRoot + '/getAll',
    PAGINATE: reparationRoot + '/getPaginate',
    SEARCH: reparationRoot + '/getSearch',
    PAGINATE_TRASHED: reparationRoot + '/getPaginateTrashed',
    SEARCH_TRASHED: reparationRoot + '/getSearchTrashed',
    ONE: reparationRoot + '/getOne',
    TRASH: reparationRoot + '/supprimer',
    RESTORE: reparationRoot + '/restaurer',
    ADD: reparationRoot + '/ajouter',
    REPARATIONS: reparationRoot + '/reparations'
  }),
  TECHNICIEN: Object.freeze({
    ALL: technicienRoot + '/getAll',
    PAGINATE: technicienRoot + '/getPaginate',
    SEARCH: technicienRoot + '/getSearch',
    PAGINATE_TRASHED: technicienRoot + '/getPaginateTrashed',
    SEARCH_TRASHED: technicienRoot + '/getSearchTrashed',
    ONE: technicienRoot + '/getOne',
    TRASH: technicienRoot + '/supprimer',
    RESTORE: technicienRoot + '/restaurer',
    ADD: technicienRoot + '/ajouter',
    TECHNICIENS: technicienRoot + '/techniciens'
  }),
  BORDEREAU: Object.freeze({
    ALL: bordereauRoot + '/getAll',
    TRASHED: bordereauRoot + '/getTrashAll',
    COLLECTED: bordereauRoot + '/getCollected',
    FOR_ENCAISSEMENT: bordereauRoot + '/getForEncaissement',
    PAGINATE: bordereauRoot + '/getPaginate',
    SEARCH: bordereauRoot + '/getSearch',
    ONE: bordereauRoot + '/getOne',
    EDIT: bordereauRoot + '/modifier',
    TRASH: bordereauRoot + '/supprimer',
    RESTORE: bordereauRoot + '/restaurer',
    ADD: bordereauRoot + '/ajouter',
    BORDEREAUX: bordereauRoot + '/bordereaux'
  }),
  EMPLACEMENT: Object.freeze({
    GETTERS: Object.freeze({
      EMPLACEMENTS: emplacementRoot + '/emplacements',
      EQUIPABLES: emplacementRoot + '/equipables'
    }),
    ACTIONS: Object.freeze({
      ALL: emplacementRoot + '/getAll',
      SELECT: emplacementRoot + '/getForSelect',
      SIMPLE_SELECT: emplacementRoot + '/getForSimpleSelect',
      AUTO: emplacementRoot + '/getAutoAll',
      EQUIPABLES: emplacementRoot + '/getEquipables',
      MONTH_RENTAL: emplacementRoot + '/getMonthRental',
      TRASHED: emplacementRoot + '/getTrashAll',
      ONE: emplacementRoot + '/getOne',
      BY_MARCHE: emplacementRoot + '/getByMarche',
      BY_MARCHE_SELECT: emplacementRoot + '/getByMarcheForSelect',
      BY_MARCHE_WITH_GEARS: emplacementRoot + '/getByMarcheWithGearsLinked',
      BY_MARCHE_UNLINKED: emplacementRoot + '/getByMarcheUnlinked',
      FREE_BY_MARCHE: emplacementRoot + '/getFreeByMarche',
      BUSY_BY_MARCHE: emplacementRoot + '/getBusyByMarche',
      BY_ZONE: emplacementRoot + '/getByZones',
      EDIT: emplacementRoot + '/modifier',
      TRASH: emplacementRoot + '/supprimer',
      RESTORE: emplacementRoot + '/restaurer',
      ADD: emplacementRoot + '/ajouter',
      PUSH: emplacementRoot + '/push'
    })
  }),
  SITE: Object.freeze({
    GETTERS: Object.freeze({
      SITES: siteRoot + '/marches',
      STRUCTURE: siteRoot + '/structure'
    }),
    ACTIONS: Object.freeze({
      ALL: siteRoot + '/getAll',
      SELECT: siteRoot + '/getSelect',
      TRASHED: siteRoot + '/getTrashAll',
      ONE: siteRoot + '/getOne',
      STRUCTURER: siteRoot + '/getGeneralStructure',
      EIDT: siteRoot + '/modifier',
      TRASH: siteRoot + '/supprimer',
      RESTORE: siteRoot + '/restaurer',
      ADD: siteRoot + '/ajouter',
      PUSH: siteRoot + '/push'
    })
  }),
  ZONE: Object.freeze({
    GETTERS: Object.freeze({
      ZONES: zoneRoot + '/zones',
      BY_SITES: zoneRoot + '/zonesBySites'
    }),
    ACTIONS: Object.freeze({
      ALL: zoneRoot + '/getAll',
      FOR_ATTRIBUTION: zoneRoot + '/getZoneForAttribution',
      TRASHED: zoneRoot + '/getTrashAll',
      BY_MARCHE: zoneRoot + '/getByMarche',
      EDIT: zoneRoot + '/modifier',
      ONE: zoneRoot + '/getOne',
      TRASH: zoneRoot + '/supprimer',
      RESTORE: zoneRoot + '/restaurer',
      ADD: zoneRoot + '/ajouter'
    })
  }),
  COMMERCIAL: Object.freeze({
    GETTERS: Object.freeze({
      COMMERCIAUX: commercialRoot + '/commerciaux',
      SALESMAN: commercialRoot + '/salesman',
      COMMERCIAL: commercialRoot + '/commercial',
      DISABLE_DATES: commercialRoot + '/disableDates'
    }),
    ACTIONS: Object.freeze({
      ALL: commercialRoot + '/getAll',
      FOR_SELECT: commercialRoot + '/getForSelect',
      PAGINATE: commercialRoot + '/getPaginate',
      SEARCH: commercialRoot + '/getSearch',
      TRASHED: commercialRoot + '/getTrashAll',
      ONE: commercialRoot + '/getOne',
      EDIT: commercialRoot + '/modifier',
      ADD: commercialRoot + '/ajouter',
      TRASH: commercialRoot + '/supprimer',
      RESTORE: commercialRoot + '/restaurer',
      ASSIGN: commercialRoot + '/attribuer',
      MONTH_BORDEREAUX: commercialRoot + '/getMonthBordereaux'
    })
  }),
  NIVEAU: Object.freeze({
    GETTERS: Object.freeze({
      NIVEAUX: niveauRoot + '/niveaux',
      NIVEAUX_BY_SITE: niveauRoot + '/niveauxBySites'
    }),
    ACTIONS: Object.freeze({
      ALL: niveauRoot + '/getAll',
      SEARCH: niveauRoot + '/getSearch',
      TRASHED: niveauRoot + '/getTrashAll',
      ONE: niveauRoot + '/getOne',
      EDIT: niveauRoot + '/modifier',
      ADD: niveauRoot + '/ajouter',
      TRASH: niveauRoot + '/supprimer',
      RESTORE: niveauRoot + '/restaurer'
    })
  }),
  PAVILLON: Object.freeze({
    GETTERS: Object.freeze({
      PAVILLON: pavillonRoot + '/pavillons',
      SELECTED: pavillonRoot + '/selected'
    }),
    ACTIONS: Object.freeze({
      ALL: pavillonRoot + '/getAll',
      SEARCH: pavillonRoot + '/getSearch',
      TRASHED: pavillonRoot + '/getTrashAll',
      ONE: pavillonRoot + '/getOne',
      EDIT: pavillonRoot + '/modifier',
      ADD: pavillonRoot + '/ajouter',
      TRASH: pavillonRoot + '/supprimer',
      RESTORE: pavillonRoot + '/restaurer',
      BY_SITE: pavillonRoot + '/getByMarche',
      PUSH: pavillonRoot + '/push'
    })
  })
})
