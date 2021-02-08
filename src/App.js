import React, { useEffect, useState } from 'react';

// import styles
import './App.css';

//import 3rd party libraries
import axios from 'axios';

//import components
import SearchBar from './components/SearchBar';
import TableView from './components/TableView';
function App () {
  const [sugesstions, setSuggestions] = useState( [] );
  useEffect( () => {
    axios.get( 'https://api.mocki.io/v1/5bb19e07' )
      .then( ( res ) => {
        setSuggestions( res.data.data )
        console.log( 'sugesstions', sugesstions )
      } )
      .catch( ( err ) => console.log( err ) );
  }, [] )
  return (
    <div className="App">
      {
        sugesstions.map( ( text, index ) => {
          return ( <p key={text.id}>{text.name}</p> )
        } )
      }
      <SearchBar />
      <TableView />
    </div>
  );
}

export default App;
