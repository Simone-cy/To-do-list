import { useState } from "react";

export function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", category: "Studio", completed: false },
    { id: 2, text: "Build a To-Do App", category: "Lavoro", completed: true },
  ]);
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (task && category) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: task, category, completed: false },
      ]);
      setTask("");
      setCategory("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div className="todo-list">
      <h1>To-Do List ✅</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Aggiungi una task..."
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Categoria..."
      />
      <button onClick={addTask}>Aggiungi</button>
      <div>
        <button onClick={() => setFilter("all")}>Tutte</button>
        <button onClick={() => setFilter("completed")}>Completate</button>
        <button onClick={() => setFilter("pending")}>In sospeso</button>
      </div>
      <ul>
        {filteredTasks.map((t) => (
          <li key={t.id}>
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
              }}
            >
              {t.text} - <strong>{t.category}</strong>
            </span>
            <button onClick={() => toggleTask(t.id)}>
              {t.completed ? "Annulla" : "Completa"}
            </button>
            <button onClick={() => removeTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}