import "./App.css";
import { useState, useRef } from "react";
function App() {
  const data = localStorage.getItem("lists")
    ? JSON.parse(localStorage.getItem("lists"))
    : [];
  const [list, setList] = useState([data]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  //console.log(list);

  const addtask = () => {
    localStorage.setItem("lists", JSON.stringify([...list, newTask]));
    setList([...list, newTask]);
    setNewTask("");
  };

  const updateTask = (e, i) => {
    const uptask = [...list];
    uptask.splice(i, 1, e.target.value);
    setList(uptask);
    localStorage.setItem("lists", JSON.stringify(uptask));
  };
  const deleteTask = (i) => {
    const delList = [...list];
    delList.splice(i, 1);
    setList(delList);
    localStorage.setItem("lists", JSON.stringify(delList));
  };
  const keyEnter = (e) => {
    if (e.key === "Enter") {
      addtask();
    }
  };
  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          placeholder="search Task ✨"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <h1 className="heading"> To-do App💥</h1>
      <div className="inputs">
        <input
          type="text"
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          onKeyDown={keyEnter}
          value={newTask}
        />
        <button className="btn" onClick={addtask}>
          Add task
        </button>
      </div>
      <div className="container">
        {list.map((val, i) => {
          if (val.includes(search)) {
            return (
              <div className="list" key={i}>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => {
                    updateTask(e);
                  }}
                />
                <span
                  className="icon"
                  onClick={() => {
                    deleteTask(i);
                  }}
                >
                  ❌
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
