const database = require("./database");

  const getSondage = (req, res) => {
    database
    .query("select * from sondage")
    .then(([sondage]) => {
      res.json(sondage);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
  };

  const getSondageById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from sondage where id = ?", [id])
      .then(([sondage]) => {
        if (sondage[0] != null) {
          res.json(sondage[0]);
        } else {
          res.status(404).send("Not Found");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

  const postSondageCreation = (req, res) => {
    const { Title, Content, UserId } = req.body;

    database
      .query(
        "INSERT INTO sondage(Title, Content, UserId) VALUES (?, ?, ?)",
        [Title, Content, UserId]
      )
      .then((result) => {
        const sondageId = result.insertId;
        res.status(201).json({ id: sondageId, message: "Sondage created successfully"});
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error inserting data into databse");
      });
  };

  module.exports = {
    getSondage,
    getSondageById,
    postSondageCreation,
  };