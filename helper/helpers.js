import { jsPDF as JsPDF } from 'jspdf'
import 'jspdf-autotable'
const remove = (item, selected, targetArray = []) => {
  let indexFound = targetArray.findIndex((elt) => elt.id === item.id)
  targetArray.splice(indexFound, 1)
  indexFound = selected.findIndex((elt) => elt.id === item.id)
  selected.splice(indexFound, 1)
}
const add = (item, targetArray = []) => {
  targetArray.push(item)
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
function arrayPdf(cols, records, filename) {
  const doc = new JsPDF('l', 'pt', cols.length > 10 ? 'a3' : 'a4')
  doc.autoTable({
    headStyles: { fillColor: '#eff5ff', textColor: '#515365' },
    columns: cols,
    body: records,
    styles: { overflow: 'linebreak' },
    pageBreak: 'auto',
    margin: { top: 45 },
    didDrawPage: () => {
      doc.text(filename.toUpperCase(), cols.length > 10 ? 535 : 365, 30)
    },
  })
  doc.save(filename + '.pdf')
}

export { remove, add, capitalize, arrayPdf }
