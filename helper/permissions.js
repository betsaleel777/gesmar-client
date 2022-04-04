const parametre = {
  acceder: 'acces gestion parametre',
  architecture: {
    acceder: "accéder à l'architecture du marché",
    site: {
      acceder: 'accéder aux sites',
      create: 'création de site',
      global: 'tout les sites sont visibles',
      own: 'site visible par le créateur uniquement',
      edit: 'modifier un site',
      trash: 'archiver un site',
      restore: 'restorer un site',
    },
    pavillon: {
      acceder: 'accéder aux pavillons',
      create: 'création de pavillon',
      global: 'tout les pavillons sont visibles',
      own: 'pavillon visible par le créateur uniquement',
      edit: 'modifier un pavillon',
      trash: 'archiver un pavillon',
      restore: 'restorer un pavillon',
    },
    etage: {
      acceder: 'accéder aux etages',
      create: 'création de etage',
      global: 'tout les etages sont visibles',
      own: 'etage visible par le créateur uniquement',
      edit: 'modifier un etage',
      trash: 'archiver un etage',
      restore: 'restorer un etage',
    },
    zone: {
      acceder: 'accéder aux zones',
      create: 'création de zone',
      global: 'tout les zones sont visibles',
      own: 'zone visible par le créateur uniquement',
      edit: 'modifier un zone',
      trash: 'archiver un zone',
      restore: 'restorer un zone',
    },
    emplacement: {
      acceder: 'accéder aux emplacements',
      create: 'création de emplacement',
      global: 'tout les emplacements sont visibles',
      own: 'emplacement visible par le créateur uniquement',
      edit: 'modifier un emplacement',
      trash: 'archiver un emplacement',
      restore: 'restorer un emplacement',
    },
  },
}

// const parameterSet = (element, external = true) : {
//   return external
//     ? externe.parametre.categorie[element]
//     : parametre.categorie[element]
// }

module.exports = {
  parametre,
}
