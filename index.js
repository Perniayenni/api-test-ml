const express = require("express");
require("dotenv").config();

const app = express();

//public directory
app.use(express.static("public"));

app.use(express.json());

//routes
app.use("/api/items", require("./routes/items"));

app.listen(process.env.PORT, () => {
  console.log("servidor corriendo");
});
