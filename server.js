const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;
  if (!file) return res.json({ error: "No file uploaded" });

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
