const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./knexfile.js'); 

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const knex = Knex(knexConfig.development);
Model.knex(knex);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(process.env.LOCAL_HOST_PORT, () => {
  console.log(
    `server is running on http://localhost:${process.env.LOCAL_HOST_PORT}`
  );
});
