const express = require("express");
const app = express();

const port = process.env.Port || 3000;

app.use("/", require("./routes"));

// listen
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});