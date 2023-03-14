const API_KEY = 'v'

const tableMap: {
  [index: number]: string
} = {
  2: "PuodkaliuHE",
  3: "RamuciuHE",  //10
  4: "KernuHE",
  6: "UkrinuHE", // turi but org 6
  7: "GudaiHE",
  8: "VadagiuHE",
  9: "ElektrenuHE",
  11: "TubausiuHE",
  12: "RudikiuHE",   //12
  13: "SabliauskiuHE", //13
  14: "KesiuHE",       //14
  15: "VokesHE",
  16: "SruojosHE",
  17: "DruskininkuHE",
  18: "SventelesHE",
  19: "PlungesHE",
  20: "GulbinuHE",
  21: "AlsedziuHE",
  24: "Sventele2HE",
  25: "UzvencioHE",
  26: "SkuodoHE",  //org 1
  27: "TestHE",  // Pasikeite is  i 10
  22: "LakinskuHE", // turi buti 5
  28: "SemeliskiuHE", // 27
}

/**
 * Handle POST /Post-dataHE.php requests by accepting sensor data and storing in database
 * @param req
 * @param res
 * @constructor
 */
const PostHeDataHandler = async (req: any, res: any) => {
  const { apiKey } = req.body

  // Check if API keys match
  if (apiKey !== API_KEY) {
    res.status(409).send({ message: 'Unauthorized'})
    return
  }

  let values: number[] = []
  try {
    values = convertToNumber([
      req.body.value1,
      req.body.value2,
      req.body.value3,
    ])
  } catch (e) {
    res.status(400).send({ message: 'Invalid data'})
    return
  }

  const heId = Number(req.body.HENr)

  if (!values || isNaN(heId) || !tableMap[heId]) {
    res.status(400).send({ message: 'Invalid data'})
    return
  }

  res.send({ message: 'Hello, this should accept sensor data'});
}

/**
 * Convert an array of strings to an array of numbers
 * @param values
 */
const convertToNumber = (values: string[]): number[] => {
  const numbers: number[] = []

  for (const element of values) {
    const value = Number(element);

    if (isNaN(value)) {
      throw new Error('Invalid data')
    }

    numbers.push(value)
  }

  return numbers
}

export default PostHeDataHandler
