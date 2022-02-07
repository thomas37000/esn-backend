const express = require("express");
const connection = require("../../config/config");

const router = express.Router();

router.get("/", (req, res) => {
  connection.query(
    `SELECT * FROM entreprises AS e
      INNER JOIN entreprises_technos AS et
        ON e.idEntreprises = et.entreprises_id
      INNER JOIN technos AS t
        ON et.technos_id = t.idTechnos
      INNER JOIN entreprises_cities AS ec
        ON e.idEntreprises = ec.id_entreprises
      INNER JOIN cities AS c
        ON ec.cities_id = c.idCities
     ORDER BY s2n_name ASC`,
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
    `SELECT * FROM entreprises AS e
      INNER JOIN entreprises_technos AS et
        ON e.idEntreprises = et.entreprises_id
      INNER JOIN technos AS t
        ON et.technos_id = t.idTechnos
      INNER JOIN entreprises_cities AS ec
        ON e.idEntreprises = ec.id_entreprises
      INNER JOIN cities AS c
        ON ec.cities_id = c.idCities
     WHERE idEntreprises = ?`,
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

// INSERT INTO Test([col1],[col2]) (
//   SELECT
//       a.Name AS [col1],
//       b.sub AS [col2]
//   FROM IdTable b
//   INNER JOIN Nametable a ON b.no = a.no
// )

// INSERT INTO user (id, name, username, opted_in)
//   SELECT id, name, username, opted_in
//   FROM user LEFT JOIN user_permission AS userPerm ON user.id = userPerm.user_id

router.post("/", (req, res) => {
  const { images, infos, s2n_name, rate, year } = req.body;
  connection.query(
    "INSERT INTO entreprises (s2n_name, infos, rate, images, year) VALUES ( ?, ?, ?, ?, ? )",

    // `INSERT INTO entreprises AS e (s2n_name, infos, rate, images, year, citie_name)
    //   SELECT CONCAT(e.s2n_name,' ',e.infos,' ',e.rate, ' ',e.images,' ', e.year,' ', e.citie_name) FROM e
    //     INNER JOIN technos As t ON t.idTechnos=e.IdEntreprises
    //   WHERE e.IdEntreprises= ?`,

    [s2n_name, infos, rate, images, year],
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
