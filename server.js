const express = require("express");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
