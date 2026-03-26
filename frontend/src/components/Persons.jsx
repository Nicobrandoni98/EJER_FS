const Persons = ({filteredPersons, deletePerson}) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
        </p> 
      ))}
    </div>
  );
};

export default Persons;
