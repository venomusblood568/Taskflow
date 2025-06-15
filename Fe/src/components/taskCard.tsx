import React from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<Props> = ({
  task,
  onDelete,
  onToggleComplete,
  onEdit,
}) => {
  return (
    <div className="bg-gray-500 p-4 rounded-2xl shadow flex justify-between items-start">
      <div>
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <p className="text-sm text-gray-300">{task.description}</p>
        <span
          className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
            task.completed ? "bg-green-600" : "bg-yellow-500"
          }`}
        >
          {task.completed ? "Done" : "Pending"}
        </span>
      </div>

      <div className="flex flex-col gap-2 ml-4">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="text-sm bg-gray-700 hover:bg-gray-400 px-2 py-1 rounded"
        >
          {task.completed ? "Undo" : "Done"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="text-sm bg-gray-700 hover:bg-gray-400 px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-sm bg-gray-700 hover:bg-gray-4000 px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
