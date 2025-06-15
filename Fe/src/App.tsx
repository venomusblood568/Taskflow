import { useState } from "react";
import AddTaskModal from "./components/addtaskmodel";
import TaskCard from "./components/taskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (
    title: string,
    description: string,
    completed: boolean
  ) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? { ...task, title, description, completed }
            : task
        )
      );
      setEditingTask(null);
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        completed,
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold uppercase font-mono mb-4">TaskFlow</h1>
      <button
        className="bg-blue-600 px-6 py-2 rounded-2xl hover:bg-blue-700 transition"
        onClick={() => setShowModal(true)}
      >
        + Add Task
      </button>

      <div className="mt-10 w-full max-w-6xl max-h-[500px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 transition-all duration-200">

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {showModal && (
        <AddTaskModal
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;
