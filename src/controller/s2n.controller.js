const express = require("express");
const connection = require("../../config/config");

const router = express.Router();

router.get("/", (req, res) => {
  connection.query(
    `SELECT * FROM entreprises ORDER BY s2n_name ASC`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send("il n 'y a pas d' entreprises ici !");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  connection.query(
    `SELECT * FROM entreprises WHERE idEntreprises = ?`,
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else if (results.length < 1) {
        res.status(404).send("s2n inconnu(e)!");
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});

router.post("/", (req, res) => {
  const { images, infos, s2n_name, rate, year, citie_name, techno_name } =
    req.body;
  connection.query(
    "INSERT INTO entreprises (s2n_name, infos, rate, images, year, citie_name, techno_name) VALUES ( ?, ?, ?, ?, ?, ?, ? )",
    [s2n_name, infos, rate, images, year, citie_name, techno_name],
    (error, results) => {
      if (error) {
        console.log("error", error);
        res.status(500).json({ error: error });
      } else {
        res.status(200).json({
          id: results.insertId,
          ...req.body,
        });
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const idS2n = req.params.id;
  connection.query(
    "DELETE FROM entreprises WHERE idEntreprises = ?",
    [idS2n],
    (err) => {
      if (err) {
        res.status(500).send("la suppression n' a pas marché !");
      } else {
        res.status(200).send("s2n bien supprimée");
      }
    }
  );
});

router.put("/s2n/:id", (req, res) => {
  const idS2n = req.params.id;
  const newS2n = req.body;
  // req.body permet de modifier toutes les valeurs au lieu de faire comme const {} = req.body
  connection.query(
    `UPDATE entreprises SET ? WHERE idEntreprises = ?`,
    [newS2n, idS2n],
    (error, result) => {
      if (error) {
        res.status(500).json({ errorMessage: error.message });
      } else {
        res.status(200).json({ ...req.body });
      }
    }
  );
});

module.exports = router;
