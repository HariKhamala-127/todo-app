import { useState } from "react";
import type { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onEditTask: (id: string, title: string, category: string) => void;
  onDeleteTask: (id: string) => void;
}

function TaskItem({
  task,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category);

  function saveEdit() {
    if (!title.trim() || !category.trim()) {
      return;
    }

    onEditTask(task.id, title.trim(), category.trim());
    setIsEditing(false);
  }

  function deleteTask() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (confirmed) {
      onDeleteTask(task.id);
    }
  }

  if (isEditing) {
    return (
      <article className="task-card">
        <div className="edit-fields">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>

        <div className="task-actions">
          <button className="save-button" onClick={saveEdit}>
            Save
          </button>

          <button
            className="cancel-button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="task-card">
      <div>
        <h2 className={task.completed ? "task-completed" : ""}>
          {task.title}
        </h2>

        <p>Category: {task.category}</p>

        <p>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="task-actions">
        <button
          className={
            task.completed
              ? "completed-button"
              : "complete-button"
          }
          onClick={() => onToggleTask(task.id)}
        >
          {task.completed ? "Completed" : "Mark Complete"}
        </button>

        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit
        </button>

        <button className="delete-button" onClick={deleteTask}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;