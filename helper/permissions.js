const parametre = {
  acceder: 'accès au menu parametre',
  configuration: {
    acceder: 'accès à la configuration des sites',
  },
  utilisateur: {
    acceder: 'accès aux utilisateurs et permissions',
  },
  gabaris: {
    acceder: 'accès au gabaris de documents',
  },
  caisse: {
    acceder: 'accès aux parametres de la caisse',
  },
  application: {
    acceder: "accès aux parametres de l'application",
  },
}
const finance = {
  acceder: 'accès au menu finance et quittancement',
  facturation: {
    acceder: 'accès au menu facturation',
  },
  bordereaux: {
    acceder: 'accès au menu bordereaux',
    commerciaux: {
      acceder: 'accès aux commerciaux',
      create: 'création des commerciaux',
      global: 'tout les commerciaux sont visibles', // à retirer d'ici
      own: 'commerciaux visibles par leur créateur', // à retirer d'ici
      edit: 'modifier un commercial',
      trash: 'archiver un commercial',
      restore: 'restorer un commercial',
      show: "voir les détails d'un commercial",
    },
    bordereau: {
      acceder: 'accès à la liste des bordereau',
      global: 'tout les bordereaux sont visibles', // à retirer d'ici
      own: 'bordereaux visible par leur créateur', // à retirer d'ici
      show: "voir les détails d'un bordereau",
    },
    collecte: {
      acceder: 'accès à la collecte des emplacements',
      create: 'création de la collecte',
      global: 'tout les collectes sont visibles', // à retirer d'ici
      own: 'collecte visibles par leur créateur', // à retirer d'ici
    },
  },
  caisse: {
    ouverture: {
      acceder: "accès à l'ouverture de caisse",
      create: "création d'ouverture de caisse",
      trash: 'archiver une ouverture de caisse',
      restore: 'restorer une ouverture de caisse',
    },
    point: {
      acceder: 'accès au point de caisse',
      global: 'tout les points de caisse sont visibles', // à retirer d'ici
      own: 'points de caisse visibles par leur créateur', // à retirer d'ici
    },
    encaissement: {
      acceder: 'accès aux encaissements',
      create: "création d'encaissement",
      closable: 'fermer la caisse',
      global: 'tout les encaissements sont visibles', // à retirer d'ici
      own: 'encaissements visibles par leur créateur', // à retirer d'ici
    },
  },
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
      show: "voir les détails d'une demande",
    },
    prospect: {
      create: 'création de prospect',
      acceder: 'accès aux prospects',
      edit: 'modifier un prospect',
      trash: 'archiver un prospect',
      restore: 'restorer un prospect',
      show: "voir les détails d'un propspect",
    },
    client: {
      acceder: 'accès aux clients',
      edit: 'modifier un client',
      trash: 'archiver un client',
      restore: 'restorer un client',
      show: "voir les détails d'un client",
    },
    contrat: {
      acceder: 'accès aux contrats',
      show: "voir les détails d'un contrat",
    },
  },
  ordonnancements: {
    acceder: 'accès au menu ordonnancements',
    ordonnancement: {
      create: "création d'ordonnancement",
      show: "voir les détails d'un ordonnancement",
    },
  },
  maintenance: {
    acceder: 'accès au menu maintenance',
  },
}

export { parametre, finance, exploitation }
