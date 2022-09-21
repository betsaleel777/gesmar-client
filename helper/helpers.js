import moment from 'moment'
const remove = (item, selected, targetArray = []) => {
  let indexFound = targetArray.findIndex((elt) => elt.id === item.id)
  targetArray.splice(indexFound, 1)
  indexFound = selected.findIndex((elt) => elt.id === item.id)
  selected.splice(indexFound, 1)
}
const add = (item, targetArray = []) => {
  targetArray.push(item)
}
function getDatesInRange(startDate, endDate) {
  let date = null
  let end = null
  if (moment(startDate).isSameOrBefore(endDate)) {
    date = moment(startDate)
    end = moment(endDate)
  } else {
    date = moment(endDate)
    end = moment(startDate)
  }
  const dates = []
  // eslint-disable-next-line no-unmodified-loop-condition
  while (date.isSameOrBefore(end)) {
    dates.push(date.format('yyyy-MM-dd'))
    date.add(1, 'days')
  }
  return dates
}

export default { remove, add, getDatesInRange }
