import React, { useState } from 'react';
import { formField } from '../HomePage'

type FormComponentProps = {
  data: any; // Replace 'any' with the actual type of 'data'
  setData: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the actual type of 'data'
  fields: formField[];
};

function FormComponent2({ data, setData, fields }: FormComponentProps) {
  const initialFormData = Object.fromEntries(fields.map((field) => [field.name, { value: '', isDisplayNameField: field.isDisplayNameField }]));

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState('');

  //handler to update form data when you input things into form
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      //[id]: value,
      [id]: { ...prevData[id], value: value },
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    let isFormValid = true;

    fields.forEach((field) => {
      const { name, label, validation } = field;
      const fieldValue = formData[name].value.trim();

      if (validation.required && fieldValue === '') {
        errors[name] = `${label} is required`;
        isFormValid = false;
      }

      else if (validation.pattern && !validation.pattern.test(fieldValue)) {
        errors[name] = validation.errorMsg;
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      setFormErrors(errors);
      setFormSuccess('');
      return;
    }

    // special case for team form
    if (formData.hasOwnProperty('teamName')) {
      const teamNameInput = formData.teamName.value.trim();
      if (data.some((team) => team.teamName === teamNameInput)) {
        setFormErrors({ teamName: 'Team name already exists.' });
        setFormSuccess('');
        return;
      }
    }

    setData((prevData) => [...prevData, formData]);
    setFormData(initialFormData);
    setFormErrors({});
    setFormSuccess('Successfully added.');

    // Clear success message
    setTimeout(() => {
      setFormSuccess('');
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <React.Fragment key={field.name}>
            <label className="formLabel" htmlFor={field.name}>
              {field.label}
            </label>
            <br />
            <input
              className="formInput"
              type="text"
              id={field.name}
              value={formData[field.name].value}
              onChange={handleInputChange}
            />
            {formErrors[field.name] && (
              <div className="alert alert-danger">{formErrors[field.name]}</div>
            )}
            <br />
          </React.Fragment>
        ))}
        <button type="submit">Add</button>
      </form>
      {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
    </div>
  );
}

export default FormComponent2;
