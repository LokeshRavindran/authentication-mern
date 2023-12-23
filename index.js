require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authenticationRoutes = require("./routes/authentication");
const generalRoutes = require("./routes/general");
const connectToDb = require("./util/database");

const app = express();

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

connectToDb();
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(authenticationRoutes.routes);
app.use(generalRoutes.routes);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server is now working on port ${process.env.PORT}`)
);
