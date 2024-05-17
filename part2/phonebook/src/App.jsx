import { useState } from 'react'
import { useEffect } from 'react'
import numbersService from './services/numbers'
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
    numbersService.getAll().then(personsResponse => {
      setPersons(personsResponse)
      setFilter('')
    })
  }, [])

  const handleAddName = async e => {
    e.preventDefault()
    const newNameTrimmed = newName.trim()
    const newNameTrimmedLc = newNameTrimmed.toLowerCase()

    const existingPerson = persons.find(person => person.name.toLowerCase() === newNameTrimmedLc)
    if (existingPerson) {
      const isConfirmed = window.confirm(
        `"${newNameTrimmed}" has already been added to the phonebook, replace the old number with a new one?`,
      )
      if (isConfirmed) {
        await numbersService.update(existingPerson.id, { ...existingPerson, number: newNumber })
        const personsResponse = await numbersService.getAll()
        setPersons(personsResponse)
        setFilter('')
        setNewName('')
        setNewNumber('')
      }
      return
    }

    const newPerson = {
      name: newNameTrimmed,
      number: newNumber.trim(),
      nameLc: newNameTrimmed.toLowerCase(),
    }

    numbersService.create(newPerson).then(newPersonResponse => {
      setPersons(persons.concat(newPersonResponse))
      setFilter('')
      setNewName('')
      setNewNumber('')
    })
  }

  const handleFilterChange = e => {
    const newFilter = e.target.value.toLowerCase()
    const filteredIds = persons
      .filter(
        person =>
          (person.nameLc && person.nameLc.includes(newFilter)) ||
          person.name.toLowerCase().includes(newFilter),
      )
      .map(person => person.id)

    setFilter(newFilter)
    setFilteredIds(new Set(filteredIds))
  }

  const handleDelete = async personId => {
    const person = persons.find(person => person.id === personId).name || personId
    const isConfirmed = window.confirm(`Delete ${person}?`)
    if (!isConfirmed) return
    await numbersService.remove(personId)
    const personsResponse = await numbersService.getAll()
    setPersons(personsResponse)
    setFilter('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        name={newName}
        number={newNumber}
        handleNameChange={e => setNewName(e.target.value)}
        handleNumberChange={e => setNewNumber(e.target.value)}
        handleAddName={handleAddName}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filteredIds={filteredIds}
        isFilteringOn={filter.length}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
