import React, { useState } from 'react';

function App() {

  const [formData, setFormData] = useState({
    teamName : "",
    member1 : "",
    member2 : ""
  })

  const handleInputChange = (event) => {
    const {id, value} = event.target;
    setFormData((prevData)=> ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <>
      <h1>Welcome to the SimpleBracketMaker!</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="teamName">Team Name</label><br/>
        <input type="text" id="teamName" onChange={handleInputChange}/><br/>
        <label htmlFor="member1">Member 1</label><br/>
        <input type="text" id="member1" onChange={handleInputChange}/><br/>
        <label htmlFor="member2">Member 2</label><br/>
        <input type="text" id="member2" onChange={handleInputChange}/><br/>
        
        <button type="submit">Add Team</button>
      </form>
    </>
  )
}


export default App;