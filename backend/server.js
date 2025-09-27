const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
require("./config/db");

// Routes
const indexRoutes = require("./routes/index");
app.use("/api", indexRoutes);

app.get("/", (req, res) => {
  res.send("Blockchain Traceability API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
