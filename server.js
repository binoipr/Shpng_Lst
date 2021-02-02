const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/items", require("./router/api/router"));
app.use("/api/users", require("./router/api/users"));
app.use("/api/auth", require("./router/api/auth"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listening to port: ${PORT}`));
