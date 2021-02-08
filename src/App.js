import React, { useEffect, useState } from 'react';

// import styles
import './App.css';

//import 3rd party libraries
import axios from 'axios';

//import components
import SearchBar from './components/SearchBar';
import TableView from './components/TableView';

function App () {
  const [suggestions, setSuggestions] = useState( [] );
  useEffect( () => {
    axios.get( 'https://api.mocki.io/v1/5bb19e07' )
      .then( ( res ) => {
        setSuggestions( res.data.data )
        console.log( 'suggestions', suggestions )
      } )
      .catch( ( err ) => console.log( err ) );
  }, [] )
  const removeSuggestion = ( id ) => {
    let tempData = suggestions.filter( ( suggestion ) => suggestion.id !== id );
    setSuggestions( tempData );
  }
  return (
    <div className="App">
      <div className="inputContainer">
        <SearchBar suggestions={suggestions} />
      </div>

      <TableView tableData={suggestions} removeSuggestion={removeSuggestion} />
    </div>
  );
}

export default App;
