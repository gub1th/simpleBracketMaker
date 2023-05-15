import React, { useState, useEffect } from 'react';

function App() {

  //for initializing/resetting
  const initialFormData = {
    teamName : "",
    member1 : "",
    member2 : ""
  };

  //for the form
  const [formData, setFormData] = useState(initialFormData);

  //actual team(s) data
  const [teamData, setTeamData] = useState([]);

  //for randomized list
  const [randomizedTeamData, setRandomizedTeamData] = useState([]);

  //for error handling
  const [error, setError] = useState("");

  //for successfully creating team
  const [success, setSuccess] = useState("");

  const handleInputChange = (event) => {
    const {id, value} = event.target;
    setFormData((prevData)=> ({
      ...prevData,
      [id]: value,
    }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const teamNameInput = formData.teamName.trim();
    const member1Input = formData.member1.trim();
    const member2Input = formData.member2.trim();

    if (teamNameInput === "" || member1Input === "" || member2Input === "") {
      setError("Please fill in all the fields");
      return;
    }
    if (member1Input !== member1Input.replace(/[^a-zA-Z]/g, "") || member2Input.trim() !== member2Input.replace(/[^a-zA-Z]/g, "")) {
      setError("Member names should only contain alphabetic characters.");
      return;
    }
    if (teamData.some((team) => team.teamName === teamNameInput)) {
      setError("Team name already exists.");
      return;
    }
    setTeamData((prevTeamData) => [...prevTeamData, formData]);
    //this not working? like i added team and immediately press submit again
    setFormData(initialFormData);
    setError("");
    setSuccess("Team successfully added.");

    //clear success message
    setTimeout(() => {setSuccess('');}, 3000);
  }

  const randomizeTeams = () => {
    let res = []
    //making a deep copy
    let tempTeamData = JSON.parse(JSON.stringify(teamData));

    while (tempTeamData.length > 0) {
      const randIndex1 = Math.floor(Math.random()*tempTeamData.length);
      //grabbing the element
      const team1 = tempTeamData[randIndex1];
      //removing the element
      tempTeamData.splice(randIndex1, 1);

      const randIndex2 = Math.floor(Math.random()*tempTeamData.length);
      //grabbing the element
      const team2 = tempTeamData[randIndex2];
      //removing the element
      tempTeamData.splice(randIndex2, 1);

      const pair = [team1, team2];
      res.push(pair);
    }

    // Handle the case of an odd number of teams
    if (tempTeamData.length === 1) {
      res.push([tempTeamData[0], null]);
    }
    setRandomizedTeamData(res);
  }

  return (
    <>
      <h1>Welcome to the SimpleBracketMaker!</h1>

      <div>
        <form onSubmit={handleSubmit}>
          <label className="formLabel" htmlFor="teamName">Team Name</label><br/>
          <input className="formInput" type="text" id="teamName" value={formData.teamName} onChange={handleInputChange}/><br/>
          <label className="formLabel" htmlFor="member1">Member 1</label><br/>
          <input className="formInput" type="text" id="member1" value={formData.member1} onChange={handleInputChange}/><br/>
          <label className="formLabel" htmlFor="member2">Member 2</label><br/>
          <input className="formInput" type="text" id="member2" value={formData.member2} onChange={handleInputChange}/><br/>
          <button type="submit">Add Team</button>
        </form>
        {error && (<div className="alert alert-danger" role="alert">{error}</div>)}
        {success && (<div className="alert alert-success" role="alert">{success}</div>)}
      </div>
      <div>
        <ul className='listGroup'>
            {teamData.map(team => <li className ="list-group-item list-group-item-primary" key={team.teamName}>{team.teamName}</li>)}
        </ul>
      </div>
      <div>
      <button type="button" onClick={randomizeTeams}>Randomize</button>
        <div className='bracketContainer'> 
          {randomizedTeamData.map((teamPairs, index) => (
            <div className ="bracketMatch" key={index}>
              <div className="bracketTeam">
                {teamPairs[0].teamName}
              </div>
              <div className="vs">
                VS
              </div>
              <div className="bracketTeam">
                {teamPairs[1] ? teamPairs[1].teamName : 'BYE'}
              </div>
            </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default App;