const remove = (item, selected, targetArray = []) => {
  const indexFound = targetArray.findIndex((equipement) => equipement.id === item.id)
  targetArray.splice(indexFound, 1)
  selected = selected.filter(({ id }) => id === item.id)
}
const add = (item, targetArray = []) => {
  targetArray.push(item)
}
module.exports = { remove, add }
