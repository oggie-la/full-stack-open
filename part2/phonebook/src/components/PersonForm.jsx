const PersonForm = ({ name, number, handleNameChange, handleNumberChange, handleAddName }) => (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={name}/>
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={number}/>
      </div>
      <div>
        <button type="submit" onClick={handleAddName}>add</button>
      </div>
    </form>
  )

export default PersonForm