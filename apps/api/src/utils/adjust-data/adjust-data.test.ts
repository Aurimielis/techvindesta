import adjustData from './adjust-data'

describe('Adjust HE sensor data', () => {
  test('should adjust with floats', () => {
    // Instantiate test data
    const heId = 1000
    const values = [20.4, 13.9, 0.0]

    const newValues = adjustData(values, heId)

    expect(newValues[0]).toBeGreaterThanOrEqual(20.3)
    expect(newValues[0]).toBeLessThanOrEqual(20.5)

    expect(newValues[1]).toBeGreaterThanOrEqual(10.9)
    expect(newValues[1]).toBeLessThanOrEqual(16.9)

    // Water level can't be below 0, can it?
    expect(newValues[2]).toBeGreaterThanOrEqual(0)
    expect(newValues[2]).toBeLessThanOrEqual(3.145)
  })

  test('should adjust with negative numbers', () => {
    // Instantiate test data
    const heId = 1001
    const values = [20.4, 13.9, 0.0]

    const newValues = adjustData(values, heId)

    expect(newValues[0]).toBeGreaterThanOrEqual(18.4)
    expect(newValues[0]).toBeLessThanOrEqual(22.4)

    expect(newValues[1]).toBeGreaterThanOrEqual(12.9)
    expect(newValues[1]).toBeLessThanOrEqual(14.9)

    // Water level can't be below 0, can it?
    expect(newValues[2]).toBeGreaterThanOrEqual(0)
    expect(newValues[2]).toBeLessThanOrEqual(0)
  })

  test('should not adjust if not found in dataCorrection map', () => {
    // Instantiate test data
    const heId = -1
    const values = [1, 2, 3]

    const newValues = adjustData(values, heId)

    expect(newValues).toEqual(values)
  })
})
