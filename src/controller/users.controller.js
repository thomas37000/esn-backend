const express = require("express");
const connection = require("../../config/config");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // le ? est remplaçé par l' email du user
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    email,
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error });
      } else if (results.length > 0) {
        // asynchrone: si il y a trop de tentatives de connexions
        // si on a une forte influence et pas assez de serveurs pour gérer toutes les requêtes
        // bcrypt pour comparer va devoir encripter le mot de passe en clair
        // il va devoir générer quelque chose ce qui va prendre du temps
        const comparePasswords = results[0].password;
        bcrypt.compare(password, comparePasswords, function (err, res) {
          if (err) {
            console.log(err);
            res.status(500).json(err);
          } else if (res) {
            res.sendStatus(200);
          } else {
            res.sendStatus(403).json({
              errorMessage: "password incorrect !",
            });
          }
        });
      } else {
        // 403 il n'a pas le droit de se connecter
        res.status(403).json({ errorMessage: "email incorrect !" });
      }
    }
  );
});

module.exports = router;
