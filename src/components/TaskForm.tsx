import { useState, type SyntheticEvent } from "react";

interface TaskFormProps {
  onAddTask: (title: string, category: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !category.trim()) {
      return;
    }

    onAddTask(title.trim(), category.trim());

    setTitle("");
    setCategory("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;