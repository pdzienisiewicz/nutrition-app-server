require("./models/User");
require("./models/Product");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authUserRoutes = require("./routes/authUserRoutes");
const authProductRoutes = require("./routes/authProductRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authUserRoutes);
app.use(authProductRoutes);

const mongoUri =
  "mongodb+srv://admin:passwordpassword@cluster0.rnnno.mongodb.net/nutritionapp?retryWrites=true&w=majority";

if (!mongoUri) {
  throw new Error(`MongoURI was not supplied.`);
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
