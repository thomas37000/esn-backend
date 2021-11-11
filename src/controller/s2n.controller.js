const express = require("express");
const connection = require("../../config/config");

const router = express.Router();

router.get("/", (req, res) => {
  connection.query(
    // "SELECT * FROM entreprises ORDER BY s2n_name ASC",
    "SELECT s2n_name, created_at, images, infos, citie_name FROM entreprises LEFT JOIN cities ON cities.idCities = entreprises.cities_id ORDER BY s2n_name ASC",
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

module.exports = router;
