require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.redirect("https://nassim.online");
});

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/nassim", require("./routes/nassim.route"));
app.use("/api/experiences", require("./routes/experience.route"));
app.use("/api/projects", require("./routes/projects.route"));

app.use("/api/educations", require("./routes/education.route"));

// Start server only after DB connection
const startServer = async () => {
  await connectDB();
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`🚀 Server running at http://localhost:${port}`)
  );
};

startServer();
