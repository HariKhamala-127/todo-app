import { useEffect, useState } from "react";
import "./App.css";
import type { Task } from "./types/task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const TASKS_STORAGE_KEY = "todo-app-tasks";

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
    </main>
  );
}

export default App;