const express = require("express");
const path = require("path");
const port = 80;
const root = path.join(__dirname, "/build");
const app = express();

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static(path.join(__dirname, "/build")));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});
