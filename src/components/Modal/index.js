import React from "react";
import "./index.css";

function Modal({cancelModal, confirmModal}) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div>
          <h1 className="title-modal"> Apagar todas as tarefas? </h1>
        </div>
        <div className="body-modal">
          <p>
            Isso irá apagar todas as suas tarefas.
          </p>
        </div>
        <div className="footer">
          <div className="yes-container">
            <button className="yes-button" onClick={() => confirmModal(true)}>Sim</button>
          </div>
          <div className="no-container">
            <button className="no-button" onClick={() => cancelModal(false)}>Não</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
