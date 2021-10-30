import React from "react";
import "./index.css";

function Modal({cancelModal, confirmModal, selectedModal}) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div>
          <h1 className="title-modal"> Apagar tarefas? </h1>
        </div>
        <div className="body-modal">
          <p>
            Deseja apagar somente as tarefas <b>concluídas</b>, <b>tudo</b>, ou <b>cancelar</b>?
          </p>
        </div>
        <div className="footer">
         <div>
              <button className="selected-button" onClick={() => selectedModal(true)}>Concluídas</button>
          </div>
          <div className="all-container">
            <button className="all-button" onClick={() => confirmModal(true)}>Todas</button>
          </div>
          
          
          <div className="cancel-container">
            <button className="cancel-button" onClick={() => cancelModal(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
