import React, { useEffect, useState, useRef } from 'react';

// import styles
import './App.css';

//import 3rd party libraries
import axios from 'axios';

//import components
import SearchBar from './components/SearchBar';
import TableView from './components/TableView';
import ModalComponent from './components/ModalComponent';
import TheHeader from './components/TheHeader';

function App () {
  const [suggestions, setSuggestions] = useState( [] );
  const [showModal, setShowModal] = useState( false );
  const [showModalDelete, setShowModalDelete] = useState( false );
  const [showModalEdit, setShowModalEdit] = useState( false );
  const [currentSelection, setCurrentSelection] = useState( '' );
  const newSuggestion = useRef();
  const changedSuggestion = useRef();
  useEffect( () => {
    axios.get( 'https://api.mocki.io/v1/f5994b97' )
      .then( ( res ) => {
        setSuggestions( res.data.data )
        console.log( 'suggestions', suggestions )
      } )
      .catch( ( err ) => console.log( err ) );
  }, [] )
  const removeSuggestion = ( data ) => {
    setCurrentSelection( data );
    setShowModalDelete( true );
  }
  const editSuggestion = ( data ) => {
    setCurrentSelection( data );
    changedSuggestion.current.value = data.name;
    setShowModalEdit( true );
  }
  const deleteSuggestion = () => {
    let tempData = suggestions.filter( ( suggestion ) => suggestion.id !== currentSelection.id );
    setSuggestions( tempData );
    setShowModalDelete( false )
  }
  const saveSuggestion = () => {
    let tempData = [...suggestions];
    if ( changedSuggestion.current.value === '' ) {
      alert( 'Suggestion cannot be empty' );
      return
    }
    for ( let i = 0; i < tempData.length; i++ ) {
      if ( tempData[i].id === currentSelection.id ) {
        tempData[i].name = changedSuggestion.current.value
      }
    }
    setSuggestions( tempData );
    setShowModalEdit( false );

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
    setShowModal( false );
  }
  const showModalToAddSuggestion = () => {
    newSuggestion.current.value = '';
    setShowModal( true );
  }
  return (
    <div className="mainContainer">
      <TheHeader />
      <div className="App">
        <ModalComponent mode="add" showModal={showModal} closeModal={() => setShowModal( false )} addSuggestion={addSuggestion} submit="Add" title="Add a Suggestion">
          <div className="flex">
            <input type="text" ref={newSuggestion} placeholder="Type here to add Suggestion" />
          </div>
        </ModalComponent>
        <ModalComponent mode="delete" showModal={showModalDelete} closeModal={() => setShowModalDelete( false )} deleteSuggestion={deleteSuggestion} submit="Delete" title={`Are you sure?`}>
          <div className="flex">
            Are you sure to delete {currentSelection.name}?
        </div>
        </ModalComponent>
        <ModalComponent mode="edit" showModal={showModalEdit} closeModal={() => setShowModalEdit( false )} saveSuggestion={saveSuggestion} submit="Save" title={`Edit Suggestion: ${ currentSelection.name }`}>
          <div className="flex">
            <input type="text" ref={changedSuggestion} />
          </div>
        </ModalComponent>
        <div className="inputContainer">
          <SearchBar suggestions={suggestions} />
        </div>
      </div>
      <div className="tableContainer">
        <div className="addBtnContainer"><button className="btn addBtn" onClick={() => showModalToAddSuggestion()}>Add Suggestion</button></div>
        <TableView tableData={suggestions} removeSuggestion={removeSuggestion} editSuggestion={editSuggestion} />

      </div>
    </div>
  );
}

export default App;
