const Person = ({ person }) => <li>{person.name} {person.number}</li>

const Persons = ({ persons, filteredIds, isFilteringOn = false }) => {
    const filteredPersons = isFilteringOn ?
        persons.filter(person => filteredIds.has(person.id))
        : persons
    return <ul>
      {filteredPersons.map(person => <Person key={person.id} person={person} />)}
    </ul>
}

export default Persons