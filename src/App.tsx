import { useEffect, useState } from "react";
import "./App.css";
import type { Task } from "./types/task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Note } from "./types/note";
import NotesSection from "./components/NotesSection";

const TASKS_STORAGE_KEY = "todo-app-tasks";
const NOTES_STORAGE_KEY = "todo-app-notes";

type Filter = "all" | "active" | "completed";

function App() {
  const [filter, setFilter] = useState<Filter>("all");
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      if (savedTasks) {
        try {
          return JSON.parse(savedTasks) as Task[];
        } catch {
          return [];
        }
      }
      return [
        {
          id: "1",
          title: "Learn React with TypeScript",
          category: "Learning",
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ];
    });
     useEffect(() => {
      localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(tasks),
      );
    }, [tasks]);
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);

    if (savedNotes) {
      try {
        const parsedNotes: unknown = JSON.parse(savedNotes);

        if (Array.isArray(parsedNotes)) {
          return parsedNotes as Note[];
        }
      } catch {
        return [];
      }
    }

    return [];
  });
  useEffect(() => {
  localStorage.setItem(
    NOTES_STORAGE_KEY,
    JSON.stringify(notes),
  );
}, [notes]);

  function addTask(title: string, category: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }
   function toggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  }
  function editTask(id: string, title: string, category: string) {
  setTasks((currentTasks) =>
    currentTasks.map((task) =>
      task.id === id
        ? { ...task, title, category }
        : task,
    ),
  );
}
function deleteTask(id: string) {
  setTasks((currentTasks) =>
    currentTasks.filter((task) => task.id !== id),
  );
}
function addNote(text: string) {
  const newNote: Note = {
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toISOString(),
  };

  setNotes((currentNotes) => [newNote, ...currentNotes]);
}

function deleteNote(id: string) {
  setNotes((currentNotes) =>
    currentNotes.filter((note) => note.id !== id),
  );
}
const filteredTasks = tasks.filter((task) => {
  if (filter === "active") {
    return !task.completed;
  }

  if (filter === "completed") {
    return task.completed;
  }

  return true;
});
  return (
    <main className="app">
      <h1>My Todo App</h1>

      <TaskForm onAddTask={addTask} />

      <div className="filter-buttons">
        <button
          className={filter === "all" ? "selected-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "selected-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter === "completed" ? "selected-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <p>Total tasks: {tasks.length}</p>

      <TaskList
      tasks={filteredTasks}
      onToggleTask={toggleTask}
      onEditTask={editTask}
      onDeleteTask={deleteTask}
      />
      <NotesSection
        notes={notes}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
      />
    </main>
  );
}

export default App;