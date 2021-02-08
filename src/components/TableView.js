import React from 'react';
import editIcon from '../images/edit3.png';
import deleteIcon from '../images/delete.webp';

const TableView = ( { tableData, removeSuggestion, editSuggestion } ) => {
  return ( <div className="tableContainer">
    <table className="styleTable">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Suggestion</th>
          <th>Unique ID</th>
          <th>Category</th>
          <th>Actions</th>
        </tr></thead>
      <tbody>
        {tableData.length > 0 &&
          tableData.map( ( data, index ) => {
            return ( <tr key={data.id}><td>{data.id}</td><td>{data.name}</td>
              <td>{( ( data.id * 100 ) / 88 ).toFixed( 4 )}</td>
              <td>Gadget</td><td>
                <div className="actionsContainer">

                  <div title="Edit" onClick={() => editSuggestion( data )} className="iconBtnContainer marginRight">
                    <img src={editIcon} alt="edit icon" className="editIcon" />
                  </div>

                  <div title="Delete" onClick={() => removeSuggestion( data )} className="iconBtnContainer">
                    <img src={deleteIcon} alt="delete icon" className="editIcon" />
                  </div>
                </div>
              </td></tr> )
          } )
        }
      </tbody>
    </table>
  </div> )
}

export default TableView;