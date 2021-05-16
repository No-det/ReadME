const express = require("express");

const app = express();
const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Working",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at *:${PORT}`);
});
