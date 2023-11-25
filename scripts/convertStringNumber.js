const convertStringNumber = (str) => {
  const noSpaces = str.replace(/\s+/g, '')
  const num = parseFloat(noSpaces)

  if (!isNaN(num) && isFinite(num)) {
    return num
  } else {
    return false
  }
}; 

export default convertStringNumber