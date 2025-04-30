import { useState, useEffect } from "react"; // Importa useEffect per gestire il caricamento iniziale

export function TodoList() {
  // Carica le task dal Local Storage (se presenti) o usa un array vuoto
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState(""); // Stato per il testo della nuova task
  const [category, setCategory] = useState(""); // Stato per la categoria della nuova task
  const [filter, setFilter] = useState("all"); // Stato per il filtro attivo (tutte, completate, in sospeso)

  // Salva le task nel Local Storage ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Funzione per aggiungere una nuova task
  const addTask = () => {
    if (task && category) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: task, category, completed: false },
      ]);
      setTask(""); // Resetta il campo di input per il testo
      setCategory(""); // Resetta il campo di input per la categoria
    }
  };

  // Funzione per alternare lo stato di completamento di una task
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Funzione per rimuovere una task dall'elenco
  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Filtra le task in base al filtro attivo
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
        onChange={(e) => setTask(e.target.value)} // Aggiorna lo stato del testo della task
        placeholder="Aggiungi una task..."
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)} // Aggiorna lo stato della categoria
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
