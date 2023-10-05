const express = require("express");
const app = express();

const userRoutes = require("./api/routes/users");

app.use("/products", userRoutes);

module.exports = app;
