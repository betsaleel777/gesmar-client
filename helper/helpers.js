import jsPDFInvoiceTemplate from 'jspdf-invoice-template'
import { ENCAISSEMENT } from './constantes'
import 'jspdf-autotable'
import { errorsInitialise, errorsWriting } from './handleErrors'

const remove = (item, selected, targetArray = []) => {
  let indexFound = targetArray.findIndex((elt) => elt.id === item.id)
  targetArray.splice(indexFound, 1)
  indexFound = selected.findIndex((elt) => elt.id === item.id)
  selected.splice(indexFound, 1)
}

const add = (item, targetArray = []) => {
  targetArray.push(item)
}
const initialeInvoicePrinter = (societe, facture, logoUrl) => {}
const ordonnancementPrinter = (societe, ordonnancement, logoUrl) => {
  const personne = ordonnancement.personne
  const responsable = ordonnancement.audit.user.name
  const labelProduct = ordonnancement.annexe ? 'Annexe' : 'Emplacement'
  const produit = ordonnancement.annexe ?? ordonnancement.emplacement
  const factures = ordonnancement.paiements.map(({ facture }) => facture)
  const property = {
    outputType: 'save',
    returnJsPDFDocObject: true,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: logoUrl,
      width: 25,
      height: 25,
      margin: { top: 0, left: 0 },
    },
    business: {
      name: societe.sigle.toUpperCase(),
      address: societe.siege,
      phone: societe.phone,
      email: societe.email,
    },
    contact: {
      label: 'ordre de recette du client: ',
      name: personne.alias,
      address: `${personne.ville}, ${personne.adresse}`,
      phone: personne.contact ?? '',
      email: personne.email ?? '',
    },
    invoice: {
      label: '#: ',
      num: `${ordonnancement.code}/${ordonnancement.contrat.code}`,
      invDate: window.$nuxt.$moment(ordonnancement.created_at).format('ll'),
      invGenDate: `fait le ${window.$nuxt.$moment().format('ll')} \n ${labelProduct}: ${produit.code}`,
      headerBorder: true,
      tableBodyBorder: true,
      header: [{ title: '#', style: { width: 10 } }, { title: 'Code' }, { title: 'Mois' }, { title: 'Statut' }, { title: 'Montant', style: { width: 20 } }],
      table: Array.from(Array(factures.length), (item, index) => [
        index + 1,
        factures[index].code,
        window.$nuxt.$moment(factures[index].periode).format('MMMM YYYY') ? window.$nuxt.$moment(factures[index].periode).format('MMMM YYYY') : 'Aucun',
        factures[index].status,
        window.$nuxt.$options.filters.currency(factures[index].loyer) ??
          window.$nuxt.$options.filters.currency(factures[index].montant) ??
          window.$nuxt.$options.filters.currency(factures[index].equipement) ??
          window.$nuxt.$options.filters.currency(factures[index].total),
      ]),
      additionalRows: [
        {
          col1: 'Total',
          col2: String(window.$nuxt.$options.filters.currency(ordonnancement.total)),
          col3: 'FCFA',
          style: { fontSize: 14 },
        },
      ],
      invDescLabel: '',
      invDesc: `Fait par ${responsable}`,
    },
    footer: {
      text: `${societe.sigle} situé à ${societe.siege}, contact:${societe.smartphone} SARL au capital de ${societe.capital}`,
    },
    pageEnable: false,
  }
  const pdfObject = jsPDFInvoiceTemplate(property)
  pdfObject.jsPDFDocObject.save('recu-' + ordonnancement.code)
}

const invoicePrinter = (societe, encaissement, logoUrl) => {
  const responsable = encaissement.caissier.user.name
  const { ordonnancement } = encaissement
  const personne = ordonnancement.personne
  const labelProduct = ordonnancement.annexe ? 'Annexe' : 'Emplacement'
  const produit = ordonnancement.annexe ?? ordonnancement.emplacement
  const subject = ordonnancement ?? encaissement.bordereau
  const factures = ordonnancement.paiements.map(({ facture }) => facture)
  const property = {
    outputType: 'save',
    returnJsPDFDocObject: true,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: logoUrl,
      width: 25,
      height: 25,
      margin: { top: 0, left: 0 },
    },
    business: {
      name: societe.sigle.toUpperCase(),
      address: societe.siege,
      phone: societe.phone,
      email: societe.email,
    },
    contact: {
      label: 'reçu de caisse du client: ',
      name: personne.alias,
      address: `${personne.ville}, ${personne.adresse}`,
      phone: personne.contact ?? '',
      email: personne.email ?? '',
      otherInfo: `payé par ${encaissement.type}`,
    },
    invoice: {
      label: '#: ',
      num: `${ordonnancement.code}/${ordonnancement.contrat.code}`,
      invDate: `Encaissé le ${encaissement.created_at}`,
      invGenDate: `${labelProduct}: ${produit.code}`,
      headerBorder: true,
      tableBodyBorder: true,
      header: [{ title: '#', style: { width: 10 } }, { title: 'Code' }, { title: 'Mois' }, { title: 'Statut' }, { title: 'Montant', style: { width: 20 } }],
      table: Array.from(Array(factures.length), (item, index) => [
        index + 1,
        factures[index].code,
        window.$nuxt.$moment(factures[index].periode).format('MMMM YYYY') ? window.$nuxt.$moment(factures[index].periode).format('MMMM YYYY') : 'Aucun',
        factures[index].status,
        window.$nuxt.$options.filters.currency(factures[index].loyer) ??
          window.$nuxt.$options.filters.currency(factures[index].montant) ??
          window.$nuxt.$options.filters.currency(factures[index].equipement) ??
          window.$nuxt.$options.filters.currency(factures[index].total),
      ]),
      additionalRows: [
        {
          col1: 'Montant versé',
          col2: String(encaissement.payable.versement),
          col3: 'FCFA',
          style: { fontSize: 14 },
        },
        {
          col1: 'Monnaie rendue:',
          col2: String(encaissement.payable.versement - encaissement.payable.montant),
          col3: 'FCFA',
          style: { fontSize: 10 },
        },
      ],
      invDescLabel: '',
      invDesc: `Fait par ${responsable}, imprimé le ${window.$nuxt.$moment().format('ll')}`,
    },
    footer: {
      text: `${societe.sigle} situé à ${societe.siege}, contact:${societe.smartphone} SARL au capital de ${societe.capital}`,
    },
    pageEnable: false,
    pageLabel: 'Page ',
  }
  const pdfObject = jsPDFInvoiceTemplate(property)
  pdfObject.jsPDFDocObject.save('recu-' + subject.code)
}

const caissePointPrinter = (societe, infos, logoUrl) => {
  const property = {
    outputType: 'save',
    returnJsPDFDocObject: true,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: logoUrl,
      width: 25,
      height: 25,
      margin: { top: 0, left: 0 },
    },
    business: {
      name: societe.sigle.toUpperCase(),
      address: societe.siege,
      phone: societe.phone,
      email: societe.email,
    },
    invoice: {
      label: 'Fait par: ',
      num: infos.caissier,
      invDate: infos.created_at,
      headerBorder: true,
      tableBodyBorder: true,
      header: [
        {
          title: '#',
          style: { width: 10 },
        },
        { title: 'Mode de paiement' },
        {
          title: 'Montant à payer',
          style: { width: 40 },
        },
        {
          title: 'Montant versé',
          style: { width: 40 },
        },
        {
          title: 'Monnaie',
          style: { width: 40 },
        },
        {
          title: 'Date',
          style: { width: 30 },
        },
      ],
      table: Array.from(Array(infos.encaissements.length), (item, index) => [
        index + 1,
        infos.encaissements[index].type,
        infos.encaissements[index].type === ENCAISSEMENT.type.espece ? infos.encaissements[index].payable.montant : infos.encaissements[index].payable.valeur,
        infos.encaissements[index].type === ENCAISSEMENT.type.espece ? infos.encaissements[index].payable.versement : infos.encaissements[index].payable.valeur,
        infos.encaissements[index].type === ENCAISSEMENT.type.espece
          ? infos.encaissements[index].payable.versement - infos.encaissements[index].payable.montant
          : 0,
        infos.encaissements[index].created_at,
      ]),
      additionalRows: [
        {
          col1: 'Total espèce:',
          col2: String(infos.totalEspece),
          col3: 'FCFA',
          style: { fontSize: 10 },
        },
        {
          col1: 'Total cheque:',
          col2: String(infos.totalCheque),
          col3: 'FCFA',
          style: { fontSize: 10 },
        },
        {
          col1: 'Total Espece et cheque:',
          col2: String(infos.totalTransaction),
          col3: 'FCFA',
          style: { fontSize: 11 },
        },
        {
          col1: 'Montant initial en caisse:',
          col2: String(infos.initial),
          col3: 'FCFA',
          style: { fontSize: 10 },
        },
        {
          col1: 'Total:',
          col2: String(infos.total),
          col3: 'FCFA',
          style: { fontSize: 12 },
        },
      ],
      invDescLabel: 'Relicat',
      invDesc: infos.perte === 0 ? 'Point de caisse validé sans rélicat' : 'Point de caisse validé avec un rélicat de ' + infos.perte + ' FCFA',
    },
    footer: {
      text: `${societe.sigle} situé à ${societe.siege}, contact:${societe.smartphone} SARL au capital de ${societe.capital}`,
    },
    pageEnable: true,
    pageLabel: 'Page ',
  }
  const pdfObject = jsPDFInvoiceTemplate(property)
  pdfObject.jsPDFDocObject.save('point-' + infos.created_at)
}

const facturePrinter = (societe, facture, logoUrl) => {
  const { personne } = facture
  const property = {
    outputType: 'save',
    returnJsPDFDocObject: true,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: logoUrl,
      width: 25,
      height: 25,
      margin: { top: 0, left: 0 },
    },
    business: {
      name: societe.sigle.toUpperCase(),
      address: societe.siege,
      phone: societe.phone,
      email: societe.email,
    },
    contact: {
      label: 'facturé à: ',
      name: personne.fullname,
      address: `${personne.ville}, ${personne.adresse}`,
      phone: personne.contact ?? '',
      email: personne.email ?? '',
      otherInfo: personne.code ?? '',
    },
    invoice: {
      label: '#: ',
      num: facture.code,
      invDate: facture.created_at,
      headerBorder: true,
      tableBodyBorder: true,
      header: [
        {
          title: '#',
          style: { width: 10 },
        },
        { title: 'Produit' },
        {
          title: 'Montant à payer',
          style: { width: 40 },
        },
        {
          title: 'Date',
          style: { width: 30 },
        },
      ],
      // table: Array.from(Array(1), () => [produit.code ?? produit.nom, paiement.montant, 'FCFA']),
      // additionalRows: [
      //   {
      //     col1: 'Total:',
      //     col2: String(infos.total),
      //     col3: 'FCFA',
      //     style: { fontSize: 12 },
      //   },
      // ],
    },
    footer: {
      text: `${societe.sigle} situé à ${societe.siege}, contact:${societe.smartphone} SARL au capital de ${societe.capital}`,
    },
    pageEnable: true,
    pageLabel: 'Page ',
  }
  const pdfObject = jsPDFInvoiceTemplate(property)
  pdfObject.jsPDFDocObject.save('facture-' + facture.code)
}
const errorHandling = (response, errorsComponentData) => {
  const { data, status } = response
  errorsInitialise(errorsComponentData)
  if (status === 401) {
    window.$nuxt.$notify({ text: data.message, title: "Echec d'Authentification", type: 'error' })
  } else if (status === 403) {
    window.$nuxt.$notify({ text: data.message, title: "Echec d'autorisation", type: 'error' })
  } else {
    errorsWriting(data.errors, errorsComponentData)
  }
}

export { remove, add, invoicePrinter, caissePointPrinter, errorHandling, facturePrinter, ordonnancementPrinter, initialeInvoicePrinter }
