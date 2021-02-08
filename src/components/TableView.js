import React from 'react';

const TableView = ( { tableData, removeSuggestion, editSuggestion } ) => {
  return ( <div className="tableContainer">
    <table cellpadding="5" cellspacing="5">
      <tr>
        <th>ID</th>
        <th>Suggestion</th>
        <th>Actions</th>
      </tr>
      {tableData.length > 0 &&
        tableData.map( ( data, index ) => {
          return ( <tr key={data.id}><td>{data.id}</td><td>{data.name}</td><td>
            <span><button onClick={() => editSuggestion( data )} className="btn editBtn">Edit</button></span>
            <span><button onClick={() => removeSuggestion( data )} className="btn deleteBtn" >Delete</button></span>
          </td></tr> )
        } )
      }
    </table>
  </div> )
}

export default TableView;