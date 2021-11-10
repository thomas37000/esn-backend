const express = require("express");
const connection = require("../../config/config");

const router = express.Router();

router.get("/", (req, res) => {
  connection.query(
    "SELECT * from entreprises ORDER BY name ASC",
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
