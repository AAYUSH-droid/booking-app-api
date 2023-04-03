require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const userRoutes = require("./routes/users");

app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.send("This is my demo project");
});

app.listen(PORT, function () {
  console.log(`Demo project at: http://localhost:${PORT}`);
});
