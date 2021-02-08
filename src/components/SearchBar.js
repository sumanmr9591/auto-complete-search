import React, { useState } from 'react';

const SearchBar = ( { suggestions } ) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState( [] );
  const [searchKey, setSearchKey] = useState( '' );
  const filterList = ( e ) => {
    setSearchKey( e.target.value )
    if ( e.target.value === '' ) {
      setFilteredSuggestions( [] );
      return
    }
    let filteredData = suggestions.filter( ( text ) => {
      return text.name.toLowerCase().indexOf( searchKey.toLowerCase() ) > -1;
    } );
    setFilteredSuggestions( filteredData );
  }
  const onSelectingText = ( text ) => {
    setFilteredSuggestions( [] );
    setSearchKey( text.name );
  }
  return ( <div className="autoCompleteText">
    <input value={searchKey} onChange={( e ) => filterList( e )} type="text" />
    <ul>
      {
        filteredSuggestions.map( ( text, index ) => {
          return ( <li key={index} onClick={() => onSelectingText( text )}>{text.name}</li> )
        } )
      }
    </ul>
  </div> )
}

export default SearchBar;