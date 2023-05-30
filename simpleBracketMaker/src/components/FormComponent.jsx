import React, { useState, useEffect } from 'react';

function FormComponent ({teamData, setTeamData}) {
    //for initializing/resetting
    const initialFormData = {
        teamName : "",
        member1 : "",
        member2 : "",
        displayName : function() {
            return this.teamName;
        }
    };

    //for the form data
    const [formData, setFormData] = useState(initialFormData);

    //for error handling of form
    const [formError, setFormError] = useState("");

    //for successfully creating team
    const [formSuccess, setFormSuccess] = useState("");

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
        setFormError("Please fill in all the fields");
        return;
        }
        if (member1Input !== member1Input.replace(/[^a-zA-Z]/g, "") || member2Input.trim() !== member2Input.replace(/[^a-zA-Z]/g, "")) {
        setFormError("Member names should only contain alphabetic characters.");
        return;
        }
        if (teamData.some((team) => team.teamName === teamNameInput)) {
        setFormError("Team name already exists.");
        return;
        }
        setTeamData((prevTeamData) => [...prevTeamData, formData]);
        setFormData(initialFormData);
        setFormError("");
        setFormSuccess("Team successfully added.");

        //clear success message
        setTimeout(() => {setFormSuccess('');}, 3000);
    }

    return (
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
          {formError && (<div className="alert alert-danger" role="alert">{formError}</div>)}
          {formSuccess && (<div className="alert alert-success" role="alert">{formSuccess}</div>)}
        </div>
    )
}

export default FormComponent;