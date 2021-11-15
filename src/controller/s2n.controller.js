const express = require("express");
const connection = require("../../config/config");

const router = express.Router();
// SELECT `titre`, `date_publication`, GROUP_CONCAT(`mot` SEPARATOR " ") AS concat_mot
// FROM `article`
// LEFT JOIN `mot_cle` ON `article_id` = `article`.`id`
// GROUP BY `article`.`id`

router.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM entreprises AS e JOIN cities AS c ON c.idCities = e.cities_id JOIN technos AS t ON t.idTechnos = e.technos_id ORDER BY s2n_name ASC",
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
  const { created_at, images, infos, s2n_name, rate } = req.body;
  connection.query(
    // "INSERT INTO entreprises (s2n_name, infos, rate, created_at, images) SELECT s2n_name, infos, rate, created_at, images FROM entreprises LEFT JOIN cities AS c ON c.idCities = c.citie_name  ",
    "INSERT INTO entreprises (s2n_name, infos, rate, created_at, images)  VALUES ( ?, ?, ?, ?, ?)",
    [s2n_name, infos, rate, created_at, images],
    (error) => {
      if (error) {
        console.log("test", error);
        res.status(500).json({ error: error });
      } else {
        res.status(200).json({
          id: result.insertId,
          ...req.body,
        });
      }
    }
  );
});

module.exports = router;