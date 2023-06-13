import React, { useState } from 'react';
import FormComponent2 from './components/FormComponent2';

function PlayerPage() {
    const [playerData, setPlayerData] = useState([]);

    const playerFields = [
        {
          name: 'pName',
          label: 'Name',
          validation: {
            required: true,
            pattern: /^[a-zA-Z]+$/,
            errorMsg: 'Name should only contain alphabetic characters.',
          },
        },
        {
          name: 'pAge',
          label: 'Age',
          validation: {
            required: true,
            pattern: /^[0-9]+$/,
            errorMsg: 'Age should only contain numbers.',
          },
        },
        {
          name: 'pHeight',
          label: 'Height',
          validation: {
            required: true,
            pattern: /^[0-9]+$/,
            errorMsg: 'Height should only contain numbers.',
          },
        },
      ];

    return (
        <>
            <div>
                <h1>Welcome to the Player Page</h1>
            </div>
            <FormComponent2
                data={playerData}
                setData={setPlayerData}
                fields={playerFields}
            />
        </>
    )
}

export default PlayerPage;