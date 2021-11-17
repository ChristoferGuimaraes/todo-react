import React from "react";
import "./index.css";

function Modal({cancelModal, confirmModal, selectedModal, title, body, btnSelected, btnAll, btnCancel}) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div>
          <h1 className="title-modal"> {title} </h1>
        </div>
        <div className="body-modal">
          <p>
            {body}
          </p>
        </div>
        <div className="footer">
         <div>
              <button className="selected-button" onClick={() => selectedModal(true)}>{btnSelected}</button>
          </div>
          <div className="all-container">
            <button className="all-button" onClick={() => confirmModal(true)}>{btnAll}</button>
          </div>
          <div className="cancel-container">
            <button className="cancel-button" onClick={() => cancelModal(false)}>{btnCancel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
