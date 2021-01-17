const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
let port = process.env.PORT || 4000;
const url = "https://api.exchangeratesapi.io/latest";

app.get("/api/rates", async (req, res) => {
  try {
    const response = await axios.get(
      `${url}?base=${req.query.base}&symbols=${req.query.currency}`
    );
    const data = response.data;

    res.status(200).json({ result: data });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use((req, res) => {
  res.status(404).send("invalid route");
});
app.listen(port, () => {
  console.log("app running on ", port);
});
