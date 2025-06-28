require("dotenv").config();
const express = require("express");
const quizRoutes = require("./routes/quizRoutes");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use("/api/quiz", quizRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
