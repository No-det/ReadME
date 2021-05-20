const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/user.routes");
const tradeRoutes = require("./routes/trade.routes");
const reviewRoutes = require("./routes/review.routes");

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

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/trade", tradeRoutes);
app.use("/api/v1/review", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
