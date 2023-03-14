import express from 'express';
import bodyParser from "body-parser";
import morgan from 'morgan';
import PostHeDataHandler from "./api/post-he-data";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello, API!' });
});

app.post('/Post-dataHE.php', PostHeDataHandler);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

export default app
