import React, { useState } from 'react';
import ListItemsComponent from './components/ListItemsComponent';
import FormComponent2 from './components/FormComponent2';
import { formField, Player } from './interfaces';

function PlayerPage() {
    const [playerData, setPlayerData] = useState<Player[]>([]);

    const playerFields : formField[] = [
        {
          isDisplayNameField: true,
          name: 'pName',
          label: 'Name',
          validation: {
            required: true,
            pattern: /^[a-zA-Z]+$/,
            errorMsg: 'Name should only contain alphabetic characters.',
          },
        },
        {
          isDisplayNameField: false,
          name: 'pAge',
          label: 'Age',
          validation: {
            required: true,
            pattern: /^[0-9]+$/,
            errorMsg: 'Age should only contain numbers.',
          },
        },
        {
          isDisplayNameField: false,
          name: 'pHeight',
          label: 'Height',
          validation: {
            required: true,
            pattern: /^[0-9]+$/,
            errorMsg: 'Height should only contain numbers.',
          },
        },
      ];

      function deletePlayer(playerNameVal : string) {
        setPlayerData(currentPlayerData => {
          return currentPlayerData.filter(player => player.pName.value != playerNameVal);
        })
      }

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
            <ListItemsComponent
            itemsData = {playerData}
            deleteItem = {deletePlayer}
        />
        </>
    )
}

export default PlayerPage;