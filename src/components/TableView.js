import React from 'react';

const TableView = ( { tableData, removeSuggestion } ) => {
  return ( <div className="tableContainer">
    <button className="btn addBtn">Add Suggestion</button>
    <table cellpadding="5" cellspacing="5">
      <tr>
        <th>ID</th>
        <th>Suggestion</th>
        <th>Actions</th>
      </tr>
      {
        tableData.map( ( data, index ) => {
          return ( <tr key={data.id}><td>{data.id}</td><td>{data.name}</td><td>
            <span><button className="btn editBtn">Edit</button></span>
            <span><button onClick={() => removeSuggestion( data.id )} className="btn deleteBtn" >Delete</button></span>
          </td></tr> )
        } )
      }
    </table>
  </div> )
}

export default TableView;