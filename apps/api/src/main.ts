import express from 'express';
import bodyParser from "body-parser";
import morgan from 'morgan';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.post('/Post-dataHE.php', (req, res) => {
  console.log("Does it get that far?")
  res.send({ message: 'Hello, this should accept sensor data'});
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
