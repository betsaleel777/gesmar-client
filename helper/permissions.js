const parametre = {
  acceder: 'accès au menu parametre',
  configuration: {
    acceder: 'accès à la configuration des sites'
  },
  utilisateur: {
    acceder: 'accès aux utilisateurs et permissions'
  },
  gabaris: {
    acceder: 'accès au gabaris de documents'
  },
  caisse: {
    acceder: 'accès aux parametres de la caisse'
  },
  application: {
    acceder: "accès aux parametres de l'application"
  }
}
const finance = {
  acceder: 'accès au menu finance et quittancement',
  facturation: {
    acceder: 'accès au menu facturation'
  },
  bordereaux: {
    acceder: 'accès au menu bordereaux',
    commerciaux: {
      acceder: 'accès aux commerciaux',
      create: 'création des commerciaux',
      edit: 'modifier un commercial',
      trash: 'archiver un commercial',
      restore: 'restorer un commercial',
      show: "voir les détails d'un commercial"
    },
    bordereau: {
      acceder: 'accès à la liste des bordereau',
      show: "voir les détails d'un bordereau"
    },
    collecte: {
      acceder: 'accès à la collecte des emplacements',
      create: 'création de la collecte'
    }
  },
  caisse: {
    ouverture: {
      acceder: "accès à l'ouverture de caisse",
      create: "création d'ouverture de caisse",
      trash: 'archiver une ouverture de caisse',
      restore: 'restorer une ouverture de caisse'
    },
    point: {
      acceder: 'accès au point de caisse'
    },
    encaissement: {
      acceder: 'accès aux encaissements',
      create: "création d'encaissement",
      closable: 'fermer la caisse'
    }
  }
}
const exploitation = {
  acceder: 'accès au menu exploitation',
  reception: {
    acceder: 'accès au menu réception',
    demande: {
      create: 'création de demande',
      acceder: 'accès aux demandes',
      edit: 'modifier une demande',
      trash: 'archiver une demande',
      restore: 'restorer une demande',
      validate: 'valider une demande',
      show: "voir les détails d'une demande"
    },
    prospect: {
      create: 'création de prospect',
      acceder: 'accès aux prospects',
      edit: 'modifier un prospect',
      trash: 'archiver un prospect',
      restore: 'restorer un prospect',
      show: "voir les détails d'un propspect"
    },
    client: {
      acceder: 'accès aux clients',
      edit: 'modifier un client',
      trash: 'archiver un client',
      restore: 'restorer un client',
      show: "voir les détails d'un client"
    },
    contrat: {
      acceder: 'accès aux contrats',
      show: "voir les détails d'un contrat"
    }
  },
  ordonnancements: {
    acceder: 'accès au menu ordonnancements',
    ordonnancement: {
      create: "création d'ordonnancement",
      show: "voir les détails d'un ordonnancement"
    }
  },
  maintenance: {
    acceder: 'accès au menu maintenance',
    reparation: {
      acceder: 'accès au menu réparation',
      create: 'créer une réparation',
      trash: 'archiver une réparation',
      estimate: 'attaché des dévis de réparation',
      show: "voir les détails d'une réparation",
      validate: 'valider une réparation'
    },
    technicien: {
      acceder: 'accès au menu technicien',
      create: 'créer une technicien',
      trash: 'archiver un technicien',
      show: "voir les détails d'un technicien"
    },
    ordre: {
      acceder: 'accès au menu ordre de réparation',
      validate: 'valider un ordre de réparation'
    }
  }
}

export { parametre, finance, exploitation }
