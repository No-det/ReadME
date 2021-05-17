const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const apiRoutes = require("./routes/api.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Mongodb connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    (db) => {
      console.log("Connected to the DB");
    },
    (err) => {
      console.log(err);
    }
  );

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Working",
  });
});

app.use("/api/v1", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at *:${PORT}`);
});
