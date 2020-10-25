export const removeFromArray = (value: string, array: Array<string>) => {
  const newArray: Array<string> = []
  array.forEach((item) => {
    if (item !== value) {
      newArray.push(item)
    }
  })
  return newArray
}
