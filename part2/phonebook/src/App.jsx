import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredIds, setFilteredIds] = useState(new Set(persons.map(person => person.id)))

  useEffect(() => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setPersons(response.data)
        setFilter('')
      })
  }, [])

  const handleAddName = (e) => {
    e.preventDefault()
    const newNameTrimmed = newName.trim()
    if (persons.some(person => person.name === newNameTrimmed)) {
      alert(`"${newNameTrimmed}" has already been added to the phonebook`)
      return
    }
    const newPersonList = persons.concat({
      id: persons.length + 1,
      name: newNameTrimmed,
      number: newNumber.trim(),
      nameLc: newNameTrimmed.toLowerCase()
    })
    
    setPersons(newPersonList)
    setFilter('')
    // setFilteredIds(new Set(newPersonList.map(person => person.id)))
  }

  const handleFilterChange = (e) => {
    const newFilter = e.target.value.toLowerCase()
    const filteredIds = persons
      .filter(person => person.nameLc && person.nameLc.includes(newFilter) || person.name.toLowerCase().includes(newFilter))
      .map(person => person.id)

    setFilter(newFilter)
    setFilteredIds(new Set(filteredIds))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={(e) => setNewName(e.target.value)}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
        handleAddName={handleAddName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredIds={filteredIds} isFilteringOn={filter.length} />
    </div>
  )
}

export default App