const express = require("express");
const connection = require("../../config/config");

const router = express.Router();

router.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM technos ORDER BY techno_name ASC",
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send("cette techno n'existe pas ou pas encore !");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM technos WHERE idTechnos = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send("user inconnu(e)!");
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});

module.exports = router;
