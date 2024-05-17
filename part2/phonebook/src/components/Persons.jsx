const Person = ({ person, handleDelete }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button onClick={handleDelete}>delete</button>
    </td>
  </tr>
)

const Persons = ({ persons, filteredIds, isFilteringOn = false, handleDelete }) => {
  const filteredPersons = isFilteringOn
    ? persons.filter(person => filteredIds.has(person.id))
    : persons

  return (
    <table>
      <tbody>
        {filteredPersons.map(person => (
          <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)} />
        ))}
      </tbody>
    </table>
  )
}

export default Persons
