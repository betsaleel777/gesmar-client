const reparationRoot = 'exploitation/reparation'
const bordereauRoot = 'finance/bordereau'
const emplacementRoot = 'architecture/emplacement'
const siteRoot = 'architecture/marche'
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
  })
})
