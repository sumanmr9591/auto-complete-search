import React, { useState } from 'react';

const SearchBar = ( { suggestions } ) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState( [] );
  const filterList = ( e ) => {
    if ( e.target.value === '' ) {
      setFilteredSuggestions( [] );
      return
    }
    let filteredData = suggestions.filter( ( text ) => {
      return text.name.toLowerCase().indexOf( e.target.value.toLowerCase() ) > -1;
    } );
    setFilteredSuggestions( filteredData );
  }
  return ( <div>
    <input onChange={( e ) => filterList( e )} type="text" />
    <ul>
      {
        filteredSuggestions.map( ( text, index ) => {
          return ( <li key={index}>{text.name}</li> )
        } )
      }
    </ul>
  </div> )
}

export default SearchBar;