require("dotenv").config();
require("./mongo.js");

const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/Person");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

/* let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]; */

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people<br/>${new Date().toISOString()}`,
  );
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    console.log(persons);
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findById(id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  }).catch((err) => {
    next(err)
  })
});

app.delete("/api/persons/:id", (req, res, error) => {
  const {id} = req.params
  Person.findByIdAndDelete(id).then((result) => {
    res.status(204).end()
  }).catch((error) => next(error))
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const person = req.body;
  const newPersonInfo = {
    name: person.name,
    number: person.number,
  };

  Person.findByIdAndUpdate(id, newPersonInfo, { new: true }).then((result) => {
    res.json(result);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
