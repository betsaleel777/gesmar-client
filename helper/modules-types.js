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
const dashboardReceptionRoot = 'dashboard/reception/'
const equipementRoot = 'architecture/equipement/'
const typeEquipementRoot = 'architecture/typEquipement/'
const abonnementRoot = 'architecture/abonnement/'
const abonnementValidationRoot = 'architecture/validationAbonnement/'
const contratAnnexeRoot = 'exploitation/contrat-annexe/'
const contratBailRoot = 'exploitation/contrat-emplacement/'
const personneRoot = 'exploitation/personne/'
const prospectRoot = 'exploitation/prospect/'
const clientRoot = 'exploitation/client/'
const contratRoot = 'exploitation/contrat/'
const annexeRoot = 'architecture/annexe/'
const typePersonneRoot = 'exploitation/typePersonne/'
const typeEmplacementRoot = 'architecture/typEmplacement/'
const roleRoot = 'user-role/role/'
const permissionRoot = 'user-role/permission/'
const guichetRoot = 'caisse/guichet/'
const compteRoot = 'caisse/compte/'
const banqueRoot = 'caisse/banque/'

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
    REPARATIONS: reparationRoot + '/reparations',
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
    TECHNICIENS: technicienRoot + '/techniciens',
  }),
  BORDEREAU: Object.freeze({
    GETTERS: {
      BORDEREAUX: bordereauRoot + '/bordereaux',
      SELECT: bordereauRoot + '/select',
      BORDEREAU: bordereauRoot + '/bordereau',
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
      CASHOUT: bordereauRoot + '/getForCashout',
    },
  }),
  EMPLACEMENT: Object.freeze({
    GETTERS: Object.freeze({
      EMPLACEMENTS: emplacementRoot + '/emplacements',
      EQUIPABLES: emplacementRoot + '/equipables',
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
      PUSH: emplacementRoot + '/push',
    }),
  }),
  SITE: Object.freeze({
    GETTERS: Object.freeze({
      SITES: siteRoot + '/marches',
      STRUCTURE: siteRoot + '/structure',
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
      PUSH: siteRoot + '/push',
    }),
  }),
  ZONE: Object.freeze({
    GETTERS: Object.freeze({
      ZONES: zoneRoot + '/zones',
      BY_SITES: zoneRoot + '/zonesBySites',
    }),
    ACTIONS: Object.freeze({
      ALL: zoneRoot + '/getAll',
      FOR_ATTRIBUTION: zoneRoot + '/getZoneForAttribution',
      SEARCH: zoneRoot + '/getSearch',
      TRASHED: zoneRoot + '/getTrashAll',
      BY_MARCHE: zoneRoot + '/getByMarche',
      EDIT: zoneRoot + '/modifier',
      ONE: zoneRoot + '/getOne',
      TRASH: zoneRoot + '/supprimer',
      RESTORE: zoneRoot + '/restaurer',
      ADD: zoneRoot + '/ajouter',
    }),
  }),
  COMMERCIAL: Object.freeze({
    GETTERS: Object.freeze({
      COMMERCIAUX: commercialRoot + '/commerciaux',
      SALESMAN: commercialRoot + '/salesman',
      COMMERCIAL: commercialRoot + '/commercial',
      DISABLE_DATES: commercialRoot + '/disableDates',
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
      MONTH_BORDEREAUX: commercialRoot + '/getMonthBordereaux',
    }),
  }),
  NIVEAU: Object.freeze({
    GETTERS: Object.freeze({
      NIVEAUX: niveauRoot + '/niveaux',
      NIVEAUX_BY_SITE: niveauRoot + '/niveauxBySites',
    }),
    ACTIONS: Object.freeze({
      ALL: niveauRoot + '/getAll',
      SEARCH: niveauRoot + '/getSearch',
      TRASHED: niveauRoot + '/getTrashAll',
      ONE: niveauRoot + '/getOne',
      EDIT: niveauRoot + '/modifier',
      ADD: niveauRoot + '/ajouter',
      TRASH: niveauRoot + '/supprimer',
      RESTORE: niveauRoot + '/restaurer',
    }),
  }),
  PAVILLON: Object.freeze({
    GETTERS: Object.freeze({
      PAVILLON: pavillonRoot + '/pavillons',
      SELECTED: pavillonRoot + '/selected',
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
      PUSH: pavillonRoot + '/push',
    }),
  }),
  COLLECTE: Object.freeze({
    GETTERS: Object.freeze({
      COLLECTES: collecteRoot + '/collectes',
      DAYS_COLLECTED: collecteRoot + '/daysCollected',
    }),
    ACTIONS: Object.freeze({
      ALL: collecteRoot + '/getAll',
      COLLECTED: collecteRoot + '/getAlreadyCollected',
      GLOBALE_COLLECTED: collecteRoot + '/getAlreadyGlobaleCollected',
      ADD: collecteRoot + '/ajouter',
    }),
  }),
  CAISSIER: Object.freeze({
    GETTERS: Object.freeze({
      CAISSIERS: caissierRoot + '/caissiers',
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
      REMOVE: caissierRoot + '/desattribuer',
    }),
  }),
  ORDONNANCEMENT: Object.freeze({
    GETTERS: Object.freeze({
      ORDONNANCEMENTS: ordonnancementRoot + 'ordonnancements',
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
      ADD: ordonnancementRoot + 'ajouter',
    }),
  }),
  OUVERTURE: Object.freeze({
    GETTERS: Object.freeze({
      OUVERTURES: ouvertureRoot + 'ouvertures',
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
      USING_EXISTS: ouvertureRoot + 'ouvertureUsingExists',
    }),
  }),
  ENCAISSEMENT: Object.freeze({
    GETTERS: Object.freeze({
      ENCAISSEMENTS: encaissementRoot + 'encaissements',
    }),
    ACTIONS: Object.freeze({
      ALL: encaissementRoot + 'getAll',
      ONE: encaissementRoot + 'getOne',
      EDIT: encaissementRoot + 'modifier',
      ADD: encaissementRoot + 'ajouter',
    }),
  }),
  APPLICATION: Object.freeze({
    GETTERS: Object.freeze({
      SOCIETE: applicationRoot + 'societe',
    }),
    ACTIONS: Object.freeze({
      ONE: applicationRoot + 'getOne',
      ADD: applicationRoot + 'ajouter',
      EDIT: applicationRoot + 'modifier',
    }),
  }),
  EQUIPEMENT: Object.freeze({
    GETTERS: Object.freeze({
      EQUIPEMENTS: equipementRoot + 'equipements',
      BY_SITE: equipementRoot + 'equipementsBySites',
    }),
    ACTIONS: Object.freeze({
      ALL: equipementRoot + 'getAll',
      PAGINATE: equipementRoot + 'getPaginate',
      SEARCH: equipementRoot + 'getSearch',
      TRASHED: equipementRoot + 'getTrashAll',
      ONE: equipementRoot + 'getOne',
      BY_TYPE: equipementRoot + 'getByType',
      GEARS_UNLINKEDSUBCRIBED: equipementRoot + 'getGearsUnlinkedsubscribed',
      EDIT: equipementRoot + 'modifier',
      TRASH: equipementRoot + 'supprimer',
      RESTORE: equipementRoot + 'restaurer',
      ADD: equipementRoot + 'ajouter',
    }),
  }),
  DASHBOARD: Object.freeze({
    RECEPTION: Object.freeze({
      GETTERS: Object.freeze({
        VALIDATION: dashboardReceptionRoot + 'validation',
        CONVERSION: dashboardReceptionRoot + 'conversion',
        BUSY: dashboardReceptionRoot + 'busy',
        EQUIPPED: dashboardReceptionRoot + 'equipped',
        LINKED: dashboardReceptionRoot + 'linked',
        SUBSCRIBED: dashboardReceptionRoot + 'subscribed',
        LOADING: dashboardReceptionRoot + 'loading',
      }),
      ACTIONS: Object.freeze({
        VALIDATION_RATE: dashboardReceptionRoot + 'getValidationRate',
        CONVERSION_RATE: dashboardReceptionRoot + 'getConversionRate',
        BUSY_RATE: dashboardReceptionRoot + 'getBusyRate',
        EQUIPPED_RATE: dashboardReceptionRoot + 'getEquippedRate',
        LINKED_RATE: dashboardReceptionRoot + 'getLinkedRate',
        SUBSCRIBED_RATE: dashboardReceptionRoot + 'getSubscribedRate',
      }),
    }),
  }),
  ABONNEMENT: Object.freeze({
    GETTERS: Object.freeze({
      ABONNEMENTS: abonnementRoot + 'abonnements',
    }),
    ACTIONS: Object.freeze({
      ALL: abonnementRoot + 'getAll',
      PAGINATE: abonnementRoot + 'getPaginate',
      SEARCH: abonnementRoot + 'getSearch',
      TRASHED: abonnementRoot + 'getTrashAll',
      MOUNTH_RENTAL_GEAR: abonnementRoot + 'getMonthRentalGear',
      ONE: abonnementRoot + 'getOne',
      EDIT: abonnementRoot + 'modifier',
      ABORT: abonnementRoot + 'resilier',
      TRASH: abonnementRoot + 'supprimer',
      RESTORE: abonnementRoot + 'restaurer',
      ADD: abonnementRoot + 'ajouter',
      SUBSCRIBE: abonnementRoot + 'abonner',
      LAST_INDEX: abonnementRoot + 'getLastIndex',
    }),
    VALIDATION: Object.freeze({
      GETTERS: Object.freeze({
        VALIDATIONS: abonnementValidationRoot + 'validations',
      }),
      ACTIONS: Object.freeze({
        ALL: abonnementValidationRoot + 'getAll',
        ONE: abonnementValidationRoot + 'getOne',
        EDIT: abonnementValidationRoot + 'modifer',
        ADD: abonnementValidationRoot + 'ajouter',
      }),
    }),
  }),
  TYPE: Object.freeze({
    EQUIPEMENT: Object.freeze({
      GETTERS: Object.freeze({
        TYPES: typeEquipementRoot + 'types',
      }),
      ACTIONS: Object.freeze({
        ALL: typeEquipementRoot + 'getAll',
        TRASHED: typeEquipementRoot + 'getTrashAll',
        ONE: typeEquipementRoot + 'getOne',
        EDIT: typeEquipementRoot + 'modifier',
        TRASH: typeEquipementRoot + 'supprimer',
        RESTORE: typeEquipementRoot + 'restaurer',
        ADD: typeEquipementRoot + 'ajouter',
      }),
    }),
    PERSONNE: Object.freeze({
      GETTERS: Object.freeze({
        TYPES: typePersonneRoot + 'types',
      }),
      ACTIONS: Object.freeze({
        ALL: typePersonneRoot + 'getAll',
        TRASHED: typePersonneRoot + 'getTrashAll',
        ONE: typePersonneRoot + 'getOne',
        EDIT: typePersonneRoot + 'modifier',
        TRASH: typePersonneRoot + 'supprimer',
        RESTORE: typePersonneRoot + 'restaurer',
        ADD: typePersonneRoot + 'ajouter',
      }),
    }),
    EMPLACEMENT: Object.freeze({
      GETTERS: Object.freeze({
        TYPES: typeEmplacementRoot + 'types',
      }),
      ACTIONS: Object.freeze({
        ALL: typeEmplacementRoot + 'getAll',
        TRASHED: typeEmplacementRoot + 'getTrashAll',
        ONE: typeEmplacementRoot + 'getOne',
        EDIT: typeEmplacementRoot + 'modifier',
        TRASH: typeEmplacementRoot + 'supprimer',
        RESTORE: typeEmplacementRoot + 'restaurer',
        ADD: typeEmplacementRoot + 'ajouter',
      }),
    }),
  }),
  CONTRAT: Object.freeze({
    GETTERS: Object.freeze({
      CONTRATS: contratRoot + 'contrats',
      ATTENTES: contratRoot + 'attentes',
      VALIDES: contratRoot + 'valides',
      RESILIES: contratRoot + 'resilies',
    }),
    ACTIONS: Object.freeze({
      ALL: contratRoot + 'getAll',
      TRASHED: contratRoot + 'getTrashAll',
      BY_MARCHE: contratRoot + 'getByMarche',
      BY_PERSONNE: contratRoot + 'getByPersonne',
      SCHEDULE_VIEW: contratRoot + 'getContratsForScheduleView',
      ONE: contratRoot + 'getOne',
      EDIT: contratRoot + 'modifier',
      TRASH: contratRoot + 'supprimer',
      RESTORE: contratRoot + 'restaurer',
      ADD: contratRoot + 'ajouter',
    }),
    ANNEXE: Object.freeze({
      GETTERS: Object.freeze({
        CONTRATS: contratAnnexeRoot + 'contrats',
        VALIDES: contratAnnexeRoot + 'valides',
      }),
      ACTIONS: Object.freeze({
        ALL: contratAnnexeRoot + 'getAll',
        VALIDES: contratAnnexeRoot + 'getAllValides',
        SEARCH: contratAnnexeRoot + 'getSearch',
        PAGINATE: contratAnnexeRoot + 'getPaginate',
        VALIDES_SEARCH: contratAnnexeRoot + 'getValidesSearch',
        VALIDES_PAGINATE: contratAnnexeRoot + 'getValidesPaginate',
        TRASHED: contratAnnexeRoot + 'getTrashAll',
        ONE: contratAnnexeRoot + 'getOne',
        SCHEDULE: contratAnnexeRoot + 'schedule',
        EDIT: contratAnnexeRoot + 'modifier',
        TRASH: contratAnnexeRoot + 'supprimer',
        RESTORE: contratAnnexeRoot + 'restaurer',
        ADD: contratAnnexeRoot + 'ajouter',
      }),
    }),
    BAIL: Object.freeze({
      GETTERS: Object.freeze({
        CONTRATS: contratBailRoot + 'contrats',
        VALIDES: contratBailRoot + 'valides',
      }),
      ACTIONS: Object.freeze({
        ALL: contratAnnexeRoot + 'getAll',
        SEARCH: contratBailRoot + 'getSearch',
        PAGINATE: contratBailRoot + 'getPaginate',
        VALIDES_SEARCH: contratBailRoot + 'getValidesSearch',
        VALIDES_PAGINATE: contratBailRoot + 'getValidesPaginate',
        VALIDES: contratBailRoot + 'getAllValides',
        TRASHED: contratBailRoot + 'getTrashAll',
        ONE: contratBailRoot + 'getOne',
        SCHEDULE: contratBailRoot + 'schedule',
        EDIT: contratBailRoot + 'modifier',
        TRASH: contratBailRoot + 'supprimer',
        RESTORE: contratBailRoot + 'restaurer',
        ADD: contratBailRoot + 'ajouter',
        BY_PERSONNE: contratBailRoot + 'getByPersonne',
        DETAILS: contratBailRoot + 'getDetails',
        PRINT: contratBailRoot + 'print',
      }),
    }),
  }),
  PERSONNE: Object.freeze({
    GETTERS: Object.freeze({
      PERSONNES: personneRoot + 'personnes',
    }),
    ACTIONS: Object.freeze({
      ALL: personneRoot + 'getAll',
      TRASHED: personneRoot + 'getTrashAll',
      BY_MARCHE: personneRoot + 'getByMarche',
      ONE: personneRoot + 'getOne',
      EDIT: personneRoot + 'modifier',
      TRASH: personneRoot + 'supprimer',
      RESTORE: personneRoot + 'restaurer',
      ADD: personneRoot + 'ajouter',
    }),
  }),
  PROSPECT: Object.freeze({
    GETTERS: Object.freeze({
      PROSPECTS: prospectRoot + 'prospects',
    }),
    ACTIONS: Object.freeze({
      ALL: prospectRoot + 'getAll',
      TRASHED: prospectRoot + 'getTrashAll',
      BY_MARCHE: prospectRoot + 'getByMarche',
      ONE: prospectRoot + 'getOne',
      EDIT: prospectRoot + 'modifier',
      TRASH: prospectRoot + 'supprimer',
      RESTORE: prospectRoot + 'restaurer',
      ADD: prospectRoot + 'ajouter',
      IMAGE_UPDATE: prospectRoot + 'updateImage',
    }),
  }),
  CLIENT: Object.freeze({
    GETTERS: Object.freeze({
      CLIENTS: clientRoot + 'clients',
    }),
    ACTIONS: Object.freeze({
      ALL: clientRoot + 'getAll',
      TRASHED: clientRoot + 'getTrashAll',
      SEARCH: clientRoot + 'getSearch',
      PAGINATE: clientRoot + 'getPaginate',
      BY_MARCHE: clientRoot + 'getByMarche',
      ONE: clientRoot + 'getOne',
      EDIT: clientRoot + 'modifier',
      TRASH: clientRoot + 'supprimer',
      RESTORE: clientRoot + 'restaurer',
      ADD: clientRoot + 'ajouter',
      IMAGE_UPDATE: clientRoot + 'updateImage',
    }),
  }),
  ANNEXE: Object.freeze({
    GETTERS: Object.freeze({
      ANNEXES: annexeRoot + 'annexes',
    }),
    ACTIONS: Object.freeze({
      ALL: annexeRoot + 'getAll',
      TRASHED: annexeRoot + 'getTrashAll',
      ONE: annexeRoot + 'getOne',
      BY_MARCHE: annexeRoot + 'getByMarche',
      EDIT: annexeRoot + 'modifier',
      TRASH: annexeRoot + 'supprimer',
      RESTORE: annexeRoot + 'restaurer',
      ADD: annexeRoot + 'ajouter',
    }),
  }),
  ROLE: Object.freeze({
    GETTERS: Object.freeze({
      ROLES: roleRoot + 'roles',
      ADMIN_WITHOUT: roleRoot + 'superAdminWihout',
    }),
    ACTIONS: Object.freeze({
      ALL: roleRoot + 'getAll',
      ONE: roleRoot + 'getOne',
      EDIT: roleRoot + 'modifier',
      TRASH: roleRoot + 'supprimer',
      ADD: roleRoot + 'ajouter',
    }),
  }),
  PERMISSION: Object.freeze({
    GETTERS: Object.freeze({
      PERMISSIONS: permissionRoot + 'permissions',
    }),
    ACTIONS: Object.freeze({
      ALL: permissionRoot + 'getAll',
      BY_ROLE: permissionRoot + 'getByRole',
    }),
  }),
  GUICHET: Object.freeze({
    GETTERS: Object.freeze({
      GUICHETS: guichetRoot + 'guichets',
    }),
    ACTIONS: Object.freeze({
      ALL: guichetRoot + 'getAll',
      ADD: guichetRoot + 'ajouter',
      ONE: guichetRoot + 'getOne',
      EDIT: guichetRoot + 'modifier',
    }),
  }),
  COMPTE: Object.freeze({
    GETTERS: Object.freeze({
      COMPTES: compteRoot + 'comptes',
    }),
    ACTIONS: Object.freeze({
      ALL: compteRoot + 'getAll',
      ADD: compteRoot + 'ajouter',
      ONE: compteRoot + 'getOne',
      EDIT: compteRoot + 'modifier',
    }),
  }),
  BANQUE: Object.freeze({
    GETTERS: Object.freeze({
      BANQUES: banqueRoot + 'banques',
    }),
    ACTIONS: Object.freeze({
      ALL: banqueRoot + 'getAll',
      ADD: banqueRoot + 'ajouter',
      ONE: banqueRoot + 'getOne',
      EDIT: banqueRoot + 'modifier',
    }),
  }),
})
