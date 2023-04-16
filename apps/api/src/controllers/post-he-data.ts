import { DatabaseService, LoggingService } from "@techvindesta/services";

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

  // Check if sensor data is valid
  let values: number[] = []
  let heId: number

  try {
    values = convertToNumber([
      req.body.value1,
      req.body.value2,
      req.body.value3,
    ])

    heId = convertToNumber([req.body.HENr])[0]
  } catch (e) {
    res.status(400).send({ message: 'Invalid data'})
    return
  }

  if (!tableMap[heId]) {
    res.status(400).send({ message: 'Invalid data'})
    return
  }

  // TODO add func to adjust data where need to be

  // Store sensor data in database
  const client = await DatabaseService.init(new LoggingService())
  try {
    await client.storeSensorData(tableMap[heId], values)
  } catch (e) {
    res.status(500).send({ message: 'Internal server error'})
    return
  }

  // Upon success, return 200 OK
  res.status(200).send({ message: 'Success'});
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
