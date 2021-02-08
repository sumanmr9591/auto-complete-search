import React, { useEffect, useState, useRef } from 'react';

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
  const newSuggestion = useRef();
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
  const addSuggestion = () => {
    if ( newSuggestion.current.value === '' ) {
      alert( 'Suggestion cannot be empty' );
      return
    }
    let newData = [...suggestions];

    newData.push( {
      id: suggestions.length + 1,
      name: newSuggestion.current.value
    } )
    setSuggestions( newData );
    console.log( suggestions );
    setShowModal( false )
  }
  return (
    <div className="App">
      <ModalComponent mode="add" showModal={showModal} closeModal={closeModal} addSuggestion={addSuggestion} submit="Add" title="Add a Suggestion">
        <div className="flex">
          <input type="text" ref={newSuggestion} />
        </div>
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
