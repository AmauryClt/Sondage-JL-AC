const express = require("express");

const app = express();
app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);


const usersHandlers = require("./usersHandlers");


app.get("/api/user", usersHandlers.getUser);
app.get("/api/user/:id", usersHandlers.getUserById);
app.post("/api/user", usersHandlers.postUserCreation);

const sondageHandlers = require("./sondageHandlers");

app.get("/api/sondage", sondageHandlers.getSondage);
app.get("/api/sondage/:id", sondageHandlers.getSondageById);
app.post("/api/sondage", sondageHandlers.postSondageCreation);

const interaction = require("./interaction");

app.post("/api/interaction", interaction.noteSondage);
app.put("/api/interaction/:id", interaction.changeNoteSondage);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
