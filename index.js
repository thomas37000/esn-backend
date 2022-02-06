const express = require("express");
const PORT = 8080;
const app = express();

const cors = require("cors");

const s2nRouter = require("./src/controller/s2n.controller");
const s2nRouterById = require("./src/controller/s2n.controller");
const users = require("./src/controller/users.controller");
const technos = require("./src/controller/technos.controller");

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});

// middlewares
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/", s2nRouter);
app.use("/s2n", s2nRouterById);
app.use("/s2n-api", s2nRouter);
app.use("/users", users);
app.use("/test/technos", technos);
app.use("/s2n/technos/", technos);
