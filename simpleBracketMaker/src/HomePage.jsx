import React, { useState, useEffect } from 'react';
import ListItemsComponent from './components/ListItemsComponent';
import FormComponent2 from './components/FormComponent2';

function HomePage() {

  //these are the fields that the Add Team form would need
  const teamFields = [
      {
        isDisplayNameField: true,
        name: 'teamName',
        label: 'Team Name',
        validation: {
          required: true,
          // pattern: /^[a-zA-Z]+$/,
          // errorMsg: 'Name should only contain alphabetic characters.',
        },
      },
      {
        isDisplayNameField: false,
        name: 'member1',
        label: 'Member 1',
        validation: {
          required: true,
          pattern: /^[a-zA-Z]+$/,
          errorMsg: 'Member 1 should only contain letters.',
        },
      },
      {
        isDisplayNameField: false,
        name: 'member2',
        label: 'Member 2',
        validation: {
          required: true,
          pattern: /^[a-zA-Z]+$/,
          errorMsg: 'Member 2 should only contain letters.',
        },
      },
    ];

    //actual team(s) data
    const [teamData, setTeamData] = useState([]);
    /*
    [
      {
        attribute1:
        isDisplayName1:
      },
      {
        attribute2:
        isDisplayName2:
      }
    ]
    */
  
    //for error handling of randomize
    const [randomizeError, setRandomizeError] = useState("");
  
    //for the rounds
    const [rounds, setRounds] = useState([]);
  
    const initializeRounds = () => {
      const tempRounds = []
      const numRounds = Math.ceil(Math.log2(teamData.length))
  
      for (let i = 0; i < numRounds; i++) {
        const tempRound = [];
        const numMatches = teamData.length / Math.pow(2, i + 1);
        for (let j = 0; j < numMatches; j++) {
          tempRound.push({
            team1: null,
            team2: null
          });
        }
        tempRounds.push(tempRound);
      }
      return tempRounds;
    }
  
    const randomizeTeams = () => {
      if (teamData.length < 2) {
        setRandomizeError("You need to input at least 2 teams. Cannot randomize");
        return;
      }
      setRandomizeError("");
  
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
  
      //initializing all the rounds
      let tempRounds = initializeRounds();
      //filling in the first rounds
      for (let i = 0; i < res.length; i++) {
        tempRounds[0][i].team1 = res[i][0]
        tempRounds[0][i].team2 = res[i][1]
      }
      setRounds(tempRounds);
  
      console.log(rounds);
    }
  
    function deleteTeam(teamName) {
      setTeamData(currentTeamData => {
        return currentTeamData.filter(team => team.teamName != teamName);
      })
    }
  
    return (
      <>
        <h1>Welcome to the SimpleBracketMaker!</h1>
  
        <FormComponent2
            data = {teamData}
            setData = {setTeamData}
            fields = {teamFields}
        />
        <ListItemsComponent
            itemsData = {teamData}
            deleteItem = {deleteTeam}
        />
        <div>
          <h5>Team Count : {teamData.length}</h5><br/>
        </div>
        <div>
          <button type="button" onClick={randomizeTeams}>Randomize</button><br/><br/>
          {randomizeError && (<div className="alert alert-danger" role="alert">{randomizeError}</div>)}
          <div className='bracketContainer'> 
            {rounds.map((round, roundIndex) => (
              <div className="bracketRound" key={roundIndex}>
                {round.map((match, matchIndex) => (
                  <div className="bracketMatch" key={matchIndex}>
                    <div className="bracketTeam">
                    {match.team1 ? (
                      match.team1.teamName
                    ) : roundIndex === 0 ? (
                      'BYE'
                    ) : (
                      'TBD'
                    )}
                    </div>
                    <div className="vs">
                      VS
                    </div>
                    <div className="bracketTeam">
                      {match.team2 ? (
                        match.team2.teamName
                      ) : roundIndex === 0 ? (
                        'BYE'
                      ) : (
                        'TBD'
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  export default HomePage;