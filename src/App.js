import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [notCompleted, setNotCompleted] = useState([]);

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

    const newTask = {
      id: 1 + Math.random(),
      text: task,
      completed: false,
    };

    setList([...list].concat(newTask));
    setTask("");
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
    console.log(list);
  };

  const clearList = function () {
    if (window.confirm("Você está prestes a apagar toda a lista!")) {
      setList([]);
    }
  };

  return (
    <>
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <div className="title">Lista de tarefas</div>
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
            <div className="unique-task-container" key={task.id}>
              <div className="task">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => checkComplete(task.id)}
                    checked={task.completed}
                  />
                  <span></span>
                </label>
                <div className="task-text">{task.text}</div>
                <div className="inputs-task-container"></div>
              </div>
              <div className="clear-task-container">
                <button
                  className="clear-task"
                  onClick={() => deleteTask(task.id)}
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bottom-container">
          <div className="active-tasks">
            {notCompleted.length === 0
              ? "Nenhuma tarefa ativa"
              : notCompleted.length === 1
              ? "Você tem apenas 1 tarefa"
              : `Você tem ${notCompleted.length} tarefas ativas.`}
          </div>
          <div className="clearall-container">
            <button
              className="clearall-button"
              onClick={clearList}
              type="button"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
      <footer>&copy; github.com/ChristoferGuimaraes</footer>
    </>
  );
}

export default App;
