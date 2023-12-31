import express from 'express';
import bodyParser from "body-parser";
import morgan from 'morgan';
import dotenv from 'dotenv';
import createHandler from "./controllers/hidro/createHandler";
import AWS from "aws-sdk";

dotenv.config();

// Ensure correct aws config is set before making any calls to AWS
AWS.config.update({region: 'eu-west-1'})

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello!' });
});

app.post('/hidro/create', createHandler);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

export default app
