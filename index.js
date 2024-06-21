const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");

/*const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "hunterh",
});*/

app.use(cors());

/*app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
app.use(limiter);*/

app.use(bodyParser.json());

app.use(express.static("src"));
app.use(compression());

let content = {
  contrato: { cadastro: [], contratos: [], valor: [], cargos: 0, imposto: 0 },
  FPV: "",
  FEC: "",
};

app.post("/contrato", (req, res) => {
  content.contrato = req.body;
  /*connection.connect();
  connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) throw err;
  console.log("The solution is: ", rows[0].solution);
  });
  connection.end(); */
  res.status(201).send("Página Cadastrada!");
});

app.get("/contrato", (req, res) => {
  res.status(201).send(content.contrato);
});

app.post("/FPV", (req, res) => {
  content.FPV = req.body;
  res.status(201).send("Página Cadastrada!");
});

app.get("/FPV", (req, res) => {
  res.status(201).send(content.FPV);
});

app.post("/FEC", (req, res) => {
  content.FEC = req.body;
  res.status(201).send("Página Cadastrada!");
});

app.get("/FEC", (req, res) => {
  res.status(201).send(content.FEC);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
