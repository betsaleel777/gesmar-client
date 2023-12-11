const reparationRoot = 'exploitation/reparation'
const bordereauRoot = 'finance/bordereau'
const collecteRoot = 'finance/collecte'
const emplacementRoot = 'architecture/emplacement'
const technicienRoot = 'exploitation/technicien'
const ordonnancementRoot = 'exploitation/ordonnancement/'
const siteRoot = 'architecture/marche'
const zoneRoot = 'architecture/zone'
const commercialRoot = 'finance/commercial'
const niveauRoot = 'architecture/niveau'
const pavillonRoot = 'architecture/pavillon'
const caissierRoot = 'caisse/caissier'
const encaissementRoot = 'caisse/encaissement/'
const ouvertureRoot = 'caisse/ouverture/'
const applicationRoot = 'architecture/application/'

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
    GETTERS: {
      BORDEREAUX: bordereauRoot + '/bordereaux',
      SELECT: bordereauRoot + '/select',
      BORDEREAU: bordereauRoot + '/bordereau'
    },
    ACTIONS: {
      ALL: bordereauRoot + '/getAll',
      TRASHED: bordereauRoot + '/getTrashAll',
      SELECT: bordereauRoot + '/getForSelect',
      PAGINATE: bordereauRoot + '/getPaginate',
      SEARCH: bordereauRoot + '/getSearch',
      ONE: bordereauRoot + '/getOne',
      ONE_EDIT: bordereauRoot + '/getEdit',
      ONE_COLLECT: bordereauRoot + '/getOneForCollect',
      ONE_CASHOUT: bordereauRoot + '/getOneForCashout',
      EDIT: bordereauRoot + '/modifier',
      TRASH: bordereauRoot + '/supprimer',
      RESTORE: bordereauRoot + '/restaurer',
      UNCASHED: bordereauRoot + '/getUncashed',
      CASHOUT: bordereauRoot + '/getForCashout'
    }
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
      AUTO_BY_SITE: emplacementRoot + '/getAutoBySite',
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
  }),
  COLLECTE: Object.freeze({
    GETTERS: Object.freeze({
      COLLECTES: collecteRoot + '/collectes',
      DAYS_COLLECTED: collecteRoot + '/daysCollected'
    }),
    ACTIONS: Object.freeze({
      ALL: collecteRoot + '/getAll',
      COLLECTED: collecteRoot + '/getAlreadyCollected',
      GLOBALE_COLLECTED: collecteRoot + '/getAlreadyGlobaleCollected',
      ADD: collecteRoot + '/ajouter'
    })
  }),
  CAISSIER: Object.freeze({
    GETTERS: Object.freeze({
      CAISSIERS: caissierRoot + '/caissiers'
    }),
    ACTIONS: Object.freeze({
      ALL: caissierRoot + '/getAll',
      TRASHED: caissierRoot + '/getTrashAll',
      ONE: caissierRoot + '/getOne',
      EDIT: caissierRoot + '/modifier',
      TRASH: caissierRoot + '/supprimer',
      RESTORE: caissierRoot + '/restaurer',
      ADD: caissierRoot + '/ajouter',
      ATTRIBUTE: caissierRoot + '/attribuer',
      REMOVE: caissierRoot + '/desattribuer'
    })
  }),
  ORDONNANCEMENT: Object.freeze({
    GETTERS: Object.freeze({
      ORDONNANCEMENTS: ordonnancementRoot + 'ordonnancements'
    }),
    ACTIONS: Object.freeze({
      ALL: ordonnancementRoot + 'getAll',
      PAGINATE: ordonnancementRoot + 'getPaginate',
      SEARCH: ordonnancementRoot + 'getSearch',
      UNPAIDS: ordonnancementRoot + 'getAllUnpaid',
      BY_SITE: ordonnancementRoot + 'getByMarche',
      ONE: ordonnancementRoot + 'getOne',
      EDIT: ordonnancementRoot + 'modifier',
      TRASH: ordonnancementRoot + 'supprimer',
      ADD: ordonnancementRoot + 'ajouter'
    })
  }),
  OUVERTURE: Object.freeze({
    GETTERS: Object.freeze({
      OUVERTURES: ouvertureRoot + 'ouvertures'
    }),
    ACTIONS: Object.freeze({
      ALL: ouvertureRoot + 'getAll',
      ONE: ouvertureRoot + 'getOne',
      PAGINATE: ouvertureRoot + 'getPaginate',
      SEARCH: ouvertureRoot + 'getSearch',
      BY_CAISSIER: ouvertureRoot + 'getByCaissier',
      EDIT: ouvertureRoot + 'modifier',
      ADD: ouvertureRoot + 'ajouter',
      EXISTS: ouvertureRoot + 'ouvertureExists',
      USING_EXISTS: ouvertureRoot + 'ouvertureUsingExists'
    })
  }),
  ENCAISSEMENT: Object.freeze({
    GETTERS: Object.freeze({
      ENCAISSEMENTS: encaissementRoot + 'encaissements'
    }),
    ACTIONS: Object.freeze({
      ALL: encaissementRoot + 'getAll',
      ONE: encaissementRoot + 'getOne',
      EDIT: encaissementRoot + 'modifier',
      ADD: encaissementRoot + 'ajouter'
    })
  }),
  APPLICATION: Object.freeze({
    GETTERS: Object.freeze({
      SOCIETE: applicationRoot + 'societe'
    }),
    ACTIONS: Object.freeze({
      ONE: applicationRoot + 'getOne',
      ADD: applicationRoot + 'ajouter',
      EDIT: applicationRoot + 'modifier'
    })
  })
})
