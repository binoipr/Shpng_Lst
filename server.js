const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/items", require("./router/api/router"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listening to port: ${PORT}`));
