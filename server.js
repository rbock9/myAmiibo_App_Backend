///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull DATABASE_URL from .env
const { PORT = 3000, DATABASE_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const AmiibosSchema = new mongoose.Schema({
  name: String,
  image: String,
  gameSeries: String,
  isOwned: { 
        type: Boolean,
        default: false
  }
});

const Amiibos = mongoose.model("Amiibos", AmiibosSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello amiibos");
});

// AMIIBOS INDEX ROUTE
app.get("/amiibos", async (req, res) => {
  try {
    // send all amiibos
    res.json(await Amiibos.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// AMIIBOS CREATE ROUTE
app.post("/amiibos", async (req, res) => {
  try {
    // send all amiibos
    res.json(await Amiibos.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// AMIIBOS UPDATE ROUTE
app.put("/amiibos/:id", async (req, res) => {
    try {
      // send all amiibos
      res.json(
        await Amiibos.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
});

// AMIIBOS DESTROY ROUTE
app.delete("/amiibos/:id", async (req, res) => {
    try {
      // send all amiibos
      res.json(await Amiibos.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
});

// route for retrieving about info
app.get("/about", (req, res) => {
    // send about info via JSON
    res.json(about);
});


///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));