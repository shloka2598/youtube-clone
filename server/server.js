const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//////////////////////////////* routes *\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// user routes
app.use("/api/user", require("./routes/auth"));
app.use("/api", require("./routes/video"));
app.use("/api", require("./routes/user"));

// DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
  (err, client) => {
    if (err || !client) {
      console.log(err);
    } else {
      console.log(`Database connected!!`);
    }
  }
);

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
