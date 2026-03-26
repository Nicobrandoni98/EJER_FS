import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
      console.log(persons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const nameExist = persons.find((person) => person.name === newName);
    if (nameExist) {
      const confirmChage = window.confirm(
        `${newName} ya existe, desea reemplazar el numero?`,
      );

      if (confirmChage) {
        const changedPerson = { ...nameExist, number: newNumber };

        personsService
          .update(nameExist.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== nameExist.id ? p : returnedPerson)),
            );
            setNewName("");
            setNewNumber("");

            setNotification(`Se actualizó ${returnedPerson.name}`);
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          });
      }

      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };
    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");

      setNotification(`Se agregó ${returnedPerson.name}`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.borrar(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleFilterChan = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filter={filter} handleFilterChan={handleFilterChan} />

      <h2>Add a new</h2>

      <PersonForm
        add={addPerson}
        name={newName}
        nameChange={handleNameChange}
        number={newNumber}
        numberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
