const express = require("express");
const connection = require("../../config/config");

const router = express.Router();

router.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM entreprises ORDER BY s2n_name ASC",
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

// router.get("/", (req, res) => {
//   res.send("c'est bon !");
// });

// router.get("/:id", (req, res) => {
//   connection.query(
//     "SELECT * FROM entreprises WHERE idEntreprises = ?",
//     [req.params.id],
//     (err, results) => {
//       if (err) {
//         res.status(500).json(err);
//       } else if (results.length < 1) {
//         res.status(404).send("s2n inconnu(e)!");
//       } else {
//         res.status(200).json(results[0]);
//       }
//     }
//   );
// });

// // INSERT INTO Test([col1],[col2]) (
// //   SELECT
// //       a.Name AS [col1],
// //       b.sub AS [col2]
// //   FROM IdTable b
// //   INNER JOIN Nametable a ON b.no = a.no
// // )

// // INSERT INTO user (id, name, username, opted_in)
// //   SELECT id, name, username, opted_in
// //   FROM user LEFT JOIN user_permission AS userPerm ON user.id = userPerm.user_id

// router.post("/", (req, res) => {
//   const { images, infos, s2n_name, rate, year } = req.body;
//   connection.query(
//     // "INSERT INTO entreprises (s2n_name, infos, rate,  images) SELECT s2n_name, infos, rate,  images FROM entreprises LEFT JOIN cities AS c ON c.idCities = c.citie_name  ",
//     "INSERT INTO entreprises (s2n_name, infos, rate,  images, year)  VALUES ( ?, ?, ?, ?, ? )",
//     [s2n_name, infos, rate, images, year],
//     (error, results) => {
//       if (error) {
//         console.log("test", error);
//         res.status(500).json({ error: error });
//       } else {
//         res.status(200).json({
//           id: results.insertId,
//           ...req.body,
//         });
//       }
//     }
//   );
// });

module.exports = router;
