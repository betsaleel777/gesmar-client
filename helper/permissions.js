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
    dashboard: 'accès au dashboard de la facturation',
  },
  bordereaux: {
    acceder: 'accès au menu bordereaux',
    dashboard: 'accès au dashboard des bordereaux',
    commerciaux: {
      acceder: 'accès aux commerciaux',
      create: 'création des commerciaux',
      global: 'tout les commerciaux sont visibles',
      own: 'commerciaux visibles par leur créateur',
      edit: 'modifier un commercial',
      trash: 'archiver un commercial',
      restore: 'restorer un commercial',
    },
    bordereau: {
      acceder: 'accès à la liste des bordereau',
      global: 'tout les bordereaux sont visibles',
      own: 'bordereaux visible par leur créateur',
    },
    collecte: {
      acceder: 'accès à la collecte des emplacements',
      create: 'création de la collecte',
      global: 'tout les collectes sont visibles',
      own: 'collecte visibles par leur créateur',
    },
  },
  caisse: {
    dashboard: 'accès au dashboard de la caisse',
    ouverture: {
      acceder: "accès à l'ouverture de caisse",
      create: "création d'ouverture de caisse",
      trash: 'archiver une ouverture de caisse',
      restore: 'restorer une ouverture de caisse',
    },
    point: {
      acceder: 'accès au point de caisse',
      global: 'tout les points de caisse sont visibles',
      own: 'points de caisse visibles par leur créateur',
    },
    encaissement: {
      acceder: 'accès aux encaissements',
      create: "création d'encaissement",
      closable: 'fermer la caisse',
      global: 'tout les encaissements sont visibles',
      own: 'encaissements visibles par leur créateur',
    },
  },
}
const exploitation = {
  acceder: 'accès au menu exploitation',
  reception: {
    dashboard: 'accès au dashboard de la réception',
    acceder: 'accès au menu réception',
    demande: {
      create: 'création de demande',
      acceder: 'accès aux demandes',
      edit: 'modifier une demande',
      trash: 'archiver une demande',
      restore: 'restorer une demande',
      global: 'toutes les demandes sont visibles',
      own: 'demandes visibles par leur créateur',
      validate: 'valider une demande',
    },
    prospect: {
      create: 'création de prospect',
      acceder: 'accès aux prospects',
      edit: 'modifier un prospect',
      trash: 'archiver un prospect',
      restore: 'restorer un prospect',
      global: 'tout les prospects sont visibles',
      own: 'prospect visibles par leur créateur',
    },
    client: {
      acceder: 'accès aux clients',
      edit: 'modifier un client',
      trash: 'archiver un client',
      restore: 'restorer un client',
      global: 'tout les clients sont visibles',
      own: 'client visibles par leur créateur',
    },
    contrat: {
      global: 'tout les contrats sont visibles',
      own: 'contrat visibles par leur créateur',
    },
  },
  ordonnancements: {
    dashboard: 'accès au dashboard des ordonnancements',
    acceder: 'accès au menu ordonnancements',
    ordonnancement: {
      create: "création d'ordonnancement",
    },
  },
  maintenance: {
    dashboard: 'accès au dashboard de la maintenance',
    acceder: 'accès au menu maintenance',
  },
}

export { parametre, finance, exploitation }
