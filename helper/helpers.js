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

const invoicePrinter = (societe, encaissement, logoUrl) => {
  const personne = encaissement.ordonnancement.personne
  const paiement = encaissement.payable
  const produit = encaissement.ordonnancement.emplacement ?? encaissement.ordonnancement.annexe
  const subject = encaissement.ordonnancement ?? encaissement.bordereau
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
      num: subject.code,
      invDate: encaissement.created_at,
      headerBorder: true,
      tableBodyBorder: true,
      header: [
        { title: 'Emplacement' },
        { title: 'Prix', style: { width: 20 } },
        { title: 'Devise', style: { width: 20 } },
      ],
      table: Array.from(Array(1), () => [produit.code ?? produit.nom, paiement.montant, 'FCFA']),
      additionalRows: [
        {
          col1: 'Montant versé',
          col2: String(paiement.versement),
          col3: 'FCFA',
          style: { fontSize: 14 },
        },
        {
          col1: 'Monnaie rendue:',
          col2: String(paiement.versement - paiement.montant),
          col3: 'FCFA',
          style: { fontSize: 10 },
        },
      ],
      invDescLabel: '',
      invDesc: '',
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
        infos.encaissements[index].type === ENCAISSEMENT.type.espece
          ? infos.encaissements[index].payable.montant
          : infos.encaissements[index].payable.valeur,
        infos.encaissements[index].type === ENCAISSEMENT.type.espece
          ? infos.encaissements[index].payable.versement
          : infos.encaissements[index].payable.valeur,
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
      invDesc:
        infos.perte === 0
          ? 'Point de caisse validé sans rélicat'
          : 'Point de caisse validé avec un rélicat de ' + infos.perte + ' FCFA',
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

export { remove, add, invoicePrinter, caissePointPrinter, errorHandling, facturePrinter }
