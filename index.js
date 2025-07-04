require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");

const emailRoute = require("./routes/mailroute");

const app = express();

const upload = multer();

app.use(upload.none()); // to parse multipart/form-data without files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("✅ Connected to MongoDB"));

app.use("/", emailRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
