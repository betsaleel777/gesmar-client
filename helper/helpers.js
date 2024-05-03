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

const invoicePrinter = (societe, encaissement) => {
  const property = {
    outputType: 'save',
    returnJsPDFDocObject: true,
    fileName: encaissement.code,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: `${societe.logo}`,
      width: 53.33,
      height: 26.66,
      margin: {
        top: 0,
        left: 0,
      },
    },
    business: {
      name: societe.sigle.toUpperCase(),
      address: societe.siege,
      phone: societe.phone,
      email: societe.email,
    },
    contact: {
      label: 'facturé à:',
      name: `${encaissement.personne.nom} ${encaissement.personne.prenom}`,
      address: `${encaissement.personne.ville}, ${encaissement.personne.adresse}`,
      phone: encaissement.personne.contact,
      email: encaissement.personne.email,
      otherInfo: encaissement.personne.code,
    },
    invoice: {
      label: 'Facture #: ',
      num: encaissement.code,
      invDate: encaissement.created_at,
      invGenDate: '',
      headerBorder: true,
      tableBodyBorder: true,
      header: [
        {
          title: 'Emplacement',
        },
        {
          title: 'Prix',
          style: {
            width: 20,
          },
        },
        {
          title: 'Devise',
          style: {
            width: 20,
          },
        },
      ],
      table: Array.from(Array(1), () => [encaissement.emplacement, encaissement.payable.montant, 'FCFA']),
      additionalRows: [
        {
          col1: 'Montant versé',
          col2: String(encaissement.payable.versement),
          col3: 'FCFA',
          style: {
            fontSize: 14,
          },
        },
        {
          col1: 'Monnaie rendue:',
          col2: String(encaissement.payable.versement - encaissement.payable.montant),
          col3: 'FCFA',
          style: {
            fontSize: 10,
          },
        },
      ],
      invDescLabel: '',
      invDesc: '',
    },
    footer: {
      text: `${societe.sigle} situé à ${societe.siege}, contact:${societe.smartphone} SARL au capital de ${societe.capital}`,
    },
    pageEnable: true,
    pageLabel: 'Page ',
  }
  const pdfObject = jsPDFInvoiceTemplate(property)
  pdfObject.jsPDFDocObject.save()
}

const caissePointPrinter = (societe, infos) => {
  const property = {
    outputType: 'save',
    returnJsPDFDocObject: true,
    fileName: 'point de caisse ' + infos.created_at,
    orientationLandscape: false,
    compress: true,
    business: {
      name: societe.nom,
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
          style: {
            width: 10,
          },
        },
        {
          title: 'Mode de paiement',
        },
        {
          title: 'Montant à payer',
          style: {
            width: 40,
          },
        },
        {
          title: 'Montant versé',
          style: {
            width: 40,
          },
        },
        {
          title: 'Monnaie',
          style: {
            width: 40,
          },
        },
        {
          title: 'Date',
          style: {
            width: 30,
          },
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
          style: {
            fontSize: 10,
          },
        },
        {
          col1: 'Total cheque:',
          col2: String(infos.totalCheque),
          col3: 'FCFA',
          style: {
            fontSize: 10,
          },
        },
        {
          col1: 'Total Espece et cheque:',
          col2: String(infos.totalTransaction),
          col3: 'FCFA',
          style: {
            fontSize: 11,
          },
        },
        {
          col1: 'Montant initial en caisse:',
          col2: String(infos.initial),
          col3: 'FCFA',
          style: {
            fontSize: 10,
          },
        },
        {
          col1: 'Total:',
          col2: String(infos.total),
          col3: 'FCFA',
          style: {
            fontSize: 12,
          },
        },
      ],
      invDescLabel: 'Notez bien',
      invDesc: 'En cas de rélicat le montant du rélicat sera déduit du salaire.',
    },
    footer: {
      text: `${societe.sigle} situé à ${societe.siege}, contact:${societe.smartphone} SARL au capital de ${societe.capital}`,
    },
    pageEnable: true,
    pageLabel: 'Page ',
  }
  const pdfObject = jsPDFInvoiceTemplate(property)
  pdfObject.jsPDFDocObject.save()
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

export { remove, add, invoicePrinter, caissePointPrinter, errorHandling }
