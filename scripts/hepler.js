
export const convertStringNumber = (str) => {
  const noSpaces = str.replace(/\s+/g, '')
  const num = parseFloat(noSpaces)

  if (!isNaN(num) && isFinite(num)) {
    return num
  } else {
    return false
  }
}; 

export const reformatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-')
  return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`
};
