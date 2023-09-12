const dataCorrection: {
  [index: number]: [number, number, number]
} = {
  1000: [0.1, 3, 3.145], // Test #1
  1001: [-2, -1, 0] // Test #2
}

const adjustData = (values: number[], heId: number): number[] => {
  if (dataCorrection[heId] === undefined) {
    return values
  }

  const newValues: number[] = []
  const diff = dataCorrection[heId]

  values.forEach((val, i) => {
    const temp = randomNumber(
      val - diff[i],
      val + diff[i]
    )

    // If resulting random number is less than 0, set it to 0 instead
    newValues[i] = temp < 0 ? 0 : temp
  })

  return newValues
}

// Get random number
const randomNumber = (min: number, max: number): number => {
  return Math.floor(
    Math.random() * ((max - min) * 100) + min * 100
  ) / 100
}

export default adjustData
