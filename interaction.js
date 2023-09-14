const database = require("./database");

// const getInteractionByUser = (req, res) => {
//   const userId = req.user.id;
//   const sondageId = req.params.id;

//   database
//     .query("SELECT Note FROM interaction WHERE UserId = ? AND SondageId = ?", [userId, sondageId])
//     .then(([interaction]) => {
//       if (interaction.length === 0) {
//         res.json({ message: "Aucune interaction trouvée pour cet utilisateur et ce sondage." });
//       } else {
//         res.json({ note: interaction[0].Note });
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error retrieving data from database");
//     });
// };


const noteSondage = (req, res) => {
  const { SondageId, UserId, Note } = req.body;

  database
    .query("INSERT INTO interaction (SondageId, UserId, Note) VALUES (?, ?, ?)", [SondageId, UserId, Note])
    .then(([interaction]) => {
      res.json(interaction);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const changeNoteSondage = (req, res) => {
    const { SondageId, UserId, Note } = req.body;

    database
      .query("UPDATE interaction SET Note = ? WHERE SondageId = ? AND UserId = ?", [Note, SondageId, UserId ])
      .then(([interaction]) => {
        res.json(interaction);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

module.exports = {
  noteSondage,
  changeNoteSondage,
  // getInteractionByUser,
};
