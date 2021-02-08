import React from 'react';

const ModalComponent = ( { showModal, closeModal, mode, title, submit, children, addSuggestion } ) => {
  return ( <div style={{ display: showModal ? 'flex' : 'none' }} className="modalWrap">
    <div className="modalBody">
      <div class="modalHeader">{title}</div>
      <span onClick={() => closeModal()} class="modalClose">×</span>
      <div className="modalContent">
        {children}
      </div>
      <div className="modalButtonContainer" >
        <button onClick={() => closeModal()} className="cancelButton">
          Cancel
        </button> {mode === 'add' && <button onClick={() => addSuggestion()} className="confirmButton" >
          {submit}
        </button>}</div>

    </div>
  </div> )
}

export default ModalComponent;