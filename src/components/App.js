import React, { useState, useEffect } from "react";
import Modal from "./Modal/index.js";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import { VscSaveAs } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

function App() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [notCompleted, setNotCompleted] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");
  const notCompletedLen = String(notCompleted.length);

  useEffect(() => {
    notCompleted.length === 0
      ? (document.title = "Lista de Tarefas")
      : (document.title = `(${notCompleted.length}) Lista de Tarefas`);
  });

  useEffect(() => {
    const temp = localStorage.getItem("list");
    const loadedList = JSON.parse(temp);

    if (loadedList) {
      setList(loadedList);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(list);
    localStorage.setItem("list", temp);
  }, [list]);

  useEffect(() => {
    const notCompletedFilter = [...list].filter(
      (task) => task.completed === false
    );
    setNotCompleted(notCompletedFilter);
  }, [list]);

  const handleSubmit = function (e) {
    e.preventDefault();

    if (verifyInput()) {
      const newTask = {
        id: 1 + Math.random(),
        text: task,
        description: "",
        toggle: false,
        completed: false,
      };

      setList([...list].concat(newTask));
      setDescription("");
      setTask("");
    } else return;
  };

  const deleteTask = function (id) {
    const updatedList = [...list].filter((task) => task.id !== id);

    setList(updatedList);
  };

  const checkComplete = function (id) {
    const updatedList = [...list].map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setList(updatedList);
  };

  const verifyInput = function () {
    if (task === "") {
      invalidInput("Campo de tarefas vazio");

      return false;
    } else return true;
  };

  const invalidInput = function (text) {
    return toast.error(text, { position: toast.POSITION.TOP_CENTER });
  };

  const saveNotify = function (text) {
    return toast.success(text, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const confirmModal = function () {
    setList([]);
    setOpenModal(false);
  };

  const selectedModal = function () {
    setList(notCompleted);
    setOpenModal(false);
  };

  const openDescription = function (id) {
    const updatedList = [...list].map((task) => {
      if (task.id === id) {
        task.toggle = !task.toggle;
      }

      return task;
    });

    setList(updatedList);
  };

  function saveDescription(id) {
    const updatedList = [...list].map((task) => {
      if (task.id === id) {
        task.description = description;
        task.toggle = !task.toggle;
        if (task.text.length >= 10) {
          saveNotify(`Tarefa "${task.text.substr(0, 10)}..." atualizada`);
        } else saveNotify(`Tarefa "${task.text}" atualizada`);
      }

      return task;
    });
    setList(updatedList);

    setDescription("");
  }

  return (
    <>
      <div className="container">
        <div className="main-container">
          <form onSubmit={handleSubmit}>
            <div className="title-container">
              <span className="title">Lista de Tarefas</span>
              <span className="version">v.1.0.1</span>
            </div>
            <div className="input-container">
              <input
                className="input-task"
                type="text"
                onChange={(e) => setTask(e.target.value)}
                value={task}
                placeholder="Adicione uma nova tarefa"
                maxLength="35"
              />
              <button className="add-new-task" type="submit">
                +
              </button>
            </div>
          </form>
          <div className="tasks-container">
            {list.map((task) => (
              <div key={task.id}>
                <div>
                  <div className="unique-task-container">
                    <div className="task">
                      <div className="checkbox-and-text">
                        <label>
                          <input
                            type="checkbox"
                            onChange={() => checkComplete(task.id)}
                            checked={task.completed}
                          />
                          <span></span>
                        </label>
                        <div
                          className="task-text"
                          style={
                            task.completed === true
                              ? { color: "rgba(0, 0, 0, 0.582)" }
                              : { color: "black" }
                          }
                        >
                          {task.completed === true ? (
                            <s>{task.text}</s>
                          ) : (
                            task.text
                          )}
                        </div>
                      </div>
                      <div className="inputs-task-container"></div>
                      <button
                        className="description-toggle"
                        onClick={() => openDescription(task.id)}
                      >
                        {task.toggle === true ? (
                          <BiChevronUp />
                        ) : (
                          <BiChevronDown />
                        )}
                      </button>
                    </div>
                    <div className="clear-task-container">
                      <button
                        style={
                          task.completed === true
                            ? { backgroundColor: "rgb(230, 20, 20)" }
                            : { backgroundColor: "blueviolet" }
                        }
                        className="clear-task"
                        onClick={() => deleteTask(task.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  {task.toggle === true && (
                    <div>
                      <div className="description-container">
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          defaultValue={task.description}
                          spellCheck="false"
                          placeholder="Insira mais detalhes da tarefa"
                          style={
                            task.completed === true
                              ? { color: "rgba(0, 0, 0, 0.582)" }
                              : { color: "black" }
                          }
                        />
                        <div className="save-description-container">
                          <button
                            className="save-description"
                            onClick={() => saveDescription(task.id)}
                            style={
                              task.completed === true
                                ? { backgroundColor: "rgb(230, 20, 20)" }
                                : { backgroundColor: "blueviolet" }
                            }
                          >
                            <VscSaveAs />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="bottom-container">
            <div className="active-tasks">
              {notCompletedLen === "0"
                ? "Nenhuma tarefa ativa."
                : notCompletedLen === "1"
                ? "Você tem apenas 1 tarefa ativa."
                : `Você tem ${notCompletedLen} tarefas ativas.`}
            </div>
            <div className="clearall-container">
              <button
                className="clearall-button"
                onClick={() => setOpenModal(true)}
                type="button"
              >
                Limpar
              </button>
            </div>
          </div>
          <footer>&copy; github.com/ChristoferGuimaraes</footer>
        </div>
      </div>
      {openModal && (
        <Modal
          cancelModal={setOpenModal}
          confirmModal={confirmModal}
          selectedModal={selectedModal}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
