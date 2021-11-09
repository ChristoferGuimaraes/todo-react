import React, { useState, useEffect } from "react";
import Modal from "./Modal/index.js";
import InputText from "./InputText/index.js";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import { VscSaveAs } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { RiArrowGoBackFill } from "react-icons/ri";

function App() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [notCompleted, setNotCompleted] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState("");
  const notCompletedLen = String(notCompleted.length);

  useEffect(() => {
    const tempLocal = localStorage.getItem("list");
    const loadedList = JSON.parse(tempLocal);

    if (loadedList) {
      setList(loadedList);
    }
  }, []);

  useEffect(() => {
    const tempLocal = JSON.stringify(list);
    localStorage.setItem("list", tempLocal);
  }, [list]);

  useEffect(() => {
    notCompleted.length === 0
      ? (document.title = "Lista de Tarefas")
      : (document.title = `(${notCompleted.length}) Lista de Tarefas`);
  });

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
        toggleTransition: "inactive",
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

    const updatedTemp = [...list].filter((task) => task.id === id);
    setTemp(updatedTemp);
  };

  const undoneTask = function () {
    if (temp !== "") {
      setList([...list].concat(temp));
    }
    setTemp("");
    console.log(list);
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
      invalidInput("Adicione alguma tarefa");

      return false;
    } else return true;
  };

  const invalidInput = function (text) {
    return toast.error(text, { position: "top-center", pauseOnHover: false });
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
        if (task.toggle === true) {
          const notToggled = [...list].filter((task) => task.id !== id);
          notToggled.map((task) => {
            task.toggle = false;
            task.toggleTransition = "inactive";
            return task;
          });
          task.toggleTransition = "active";
        } else {
          task.toggleTransition = "inactive";
        }
      }
      return task;
    });
    setList(updatedList);
  };

  const handleDescriptionChange = function (event) {
    setDescription(event.target.value);
  };

  const saveDescription = function (id) {
    const updatedList = [...list].map((task) => {
      if (task.id === id) {
        task.description = description;
        if (task.text.length > 10) {
          saveNotify(`Tarefa "${task.text.substr(0, 10)}..." atualizada`);
        } else saveNotify(`Tarefa "${task.text}" atualizada`);
      }

      return task;
    });
    setList(updatedList);
    setDescription("");
  };

  const saveNotify = function (text) {
    return toast.success(text, {
      position: "bottom-left",
      pauseOnHover: false,
    });
  };

  return (
    <>
      <div className="container">
        <div className="main-container">
          <form onSubmit={handleSubmit}>
            <div className="title-container">
              <span className="title">Lista de Tarefas</span>
              <span className="version">v.1.0.6</span>
            </div>
            <div className="input-container">
              <InputText
                className="input-task"
                onChange={(e) => setTask(e.target.value)}
                value={task}
                placeholder="Adicione uma nova tarefa"
                maxLength="30"
              />
              <button className="add-new-task" type="submit">
                +
              </button>
            </div>
          </form>
          {list.length === 0 ? (
            <div className="no-task-field-container">
              <span>
                <i>Campo de tarefas vazio.</i>
              </span>
            </div>
          ) : (
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
                    <div
                      id="description-container-toggle"
                      className={task.toggleTransition}
                      style={
                        task.completed === true
                          ? { borderLeftColor: "red" }
                          : { borderLeftColor: "blueviolet" }
                      }
                    >
                      <div className="description-container">
                        <textarea
                          onChange={(e) => handleDescriptionChange(e)}
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
                          >
                            <VscSaveAs />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bottom-container">
            <div className="active-tasks">
              {notCompletedLen === "0"
                ? "Nenhuma tarefa ativa."
                : notCompletedLen === "1"
                ? "Você tem 1 tarefa ativa."
                : `Você tem ${notCompletedLen} tarefas ativas.`}
            </div>
            <div className="undone-clear-container">
              <button className="undone-button" onClick={undoneTask}>
                <RiArrowGoBackFill />
              </button>
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
          </div>
          <footer>&copy; github.com/ChristoferGuimaraes</footer>
        </div>
      </div>
      {openModal && (
        <Modal
          title={"Apagar tarefas?"}
          body={
            <span>
              Deseja apagar as tarefas <b>Concluídas</b>, <b>Todas</b>, ou{" "}
              <b>Cancelar</b>?
            </span>
          }
          btnSelected={"Concluídas"}
          btnAll={"Todas"}
          btnCancel={"Cancelar"}
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
