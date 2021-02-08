import React, { useEffect, useState } from 'react';

// import styles
import './App.css';

//import 3rd party libraries
import axios from 'axios';

//import components
import SearchBar from './components/SearchBar';
import TableView from './components/TableView';
import ModalComponent from './components/ModalComponent';

function App () {
  const [suggestions, setSuggestions] = useState( [] );
  const [showModal, setShowModal] = useState( false );
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
  const closeModal = () => {
    setShowModal( false )
  }
  return (
    <div className="App">
      <ModalComponent showModal={showModal} closeModal={closeModal} submit="Add" title="Add a Suggestion">
        <p>I can be the body</p>
      </ModalComponent>
      <div className="inputContainer">
        <SearchBar suggestions={suggestions} />
      </div>
      <button className="btn addBtn" onClick={() => setShowModal( true )}>Add Suggestion</button>
      <TableView tableData={suggestions} removeSuggestion={removeSuggestion} />
    </div>
  );
}

export default App;
