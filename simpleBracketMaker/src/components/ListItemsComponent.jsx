import React from 'react';

function ListItemsComponent({ itemsData, deleteItem }) {
    console.log('a');
    console.log(itemsData);
    return (
      <div>
        {itemsData && (
          <ul className='listGroup'>
            {itemsData.map((item, index) => (
              <li className='list-group-item list-group-item-primary' key={index}>
                {Object.keys(item).map((fieldName) => (
                  <React.Fragment key={fieldName}>
                    {item[fieldName].isDisplayNameField && (
                      <>
                        <strong>{fieldName}:</strong> {item[fieldName].value}
                        <br />
                      </>
                    )}
                  </React.Fragment>
                ))}
                <button onClick={() => deleteItem(index)} className='btn btn-danger'>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}

export default ListItemsComponent;