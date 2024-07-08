require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const apiRouter = require("./src/routes");
const postwoman = require("./postwoman");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);
app.use("/postwoman", postwoman);

const mongoURI = process.env.MONGO_URI

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

mongoose.connect(mongoURI).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log("Failed to connect to Database");
    console.log(`Recieved Error: ${err}`);
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});