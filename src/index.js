const express = require("express");
const serverless = require("serverless-http");
const { showUser, addUser } = require("./user/router");
const app = express();

app.use(
  express.json({
    extended: false,
  })
);
app.use("/.netlify/functions/api", (req, res) => {
  res.json({
    status: "success",
    message: "netlify",
  });
});
app.get("/", (req, res) => {
  res.send("halo");
});
app.get("/user", showUser);
app.post("/user", addUser);

app.listen(5000, () => console.log("sever running at http://localhost:5000"));

module.exports.hanler = serverless(app);
