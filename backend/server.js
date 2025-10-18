const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const todosRouter = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/todos", todosRouter);

// simple health
app.get("/healthz", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
