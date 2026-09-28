import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onEditTask: (id: string, title: string, category: string) => void;
  onDeleteTask: (id: string) => void;
}

function TaskList({
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </section>
  );
}

export default TaskList;