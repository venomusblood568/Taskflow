import React, { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface AddTaskModalProps {
  onClose: () => void;
  onAdd: (title: string, description: string, completed: boolean) => void;
  onEdit?: (task: Task) => void;
  editTask?: Task | null;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  onClose,
  onAdd,
  onEdit,
  editTask,
}) => {
  const [title, setTitle] = useState(editTask?.title || "");
  const [description, setDescription] = useState(editTask?.description || "");
  const [status, setStatus] = useState(editTask?.completed ? "true" : "false");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setStatus(editTask.completed ? "true" : "false");
    }
  }, [editTask]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editTask && onEdit) {
      onEdit({
        id: editTask.id,
        title,
        description,
        completed: status === "true",
      });
    } else {
      onAdd(title, description, status === "true");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="border p-6 rounded-xl w-full max-w-md shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-gray-900">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          {editTask ? "Edit Task" : "Add New Task"}
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full mb-3 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full mb-3 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            className="bg-blue-500 px-4 py-2 rounded-2xl hover:bg-blue-600"
            onClick={handleSubmit}
          >
            {editTask ? "Update" : "Add"}
          </button>
          <button
            className="bg-red-500 px-4 py-2 rounded-2xl hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
