import { useEffect, useState } from "react";
import AddTaskModal from "./components/addtaskmodel";
import TaskCard from "./components/taskCard";
import { getTasks, createTask, deleteTask, updateTask } from "./api/api";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null); 

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (
    title: string,
    description: string,
    completed: boolean
  ) => {
    const res = await createTask({ title, description, completed });
    setTasks((prev) => [res.data, ...prev]);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggleComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(id, updatedTask);
    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
  };

  const handleEditClick = (task: Task) => {
    setEditTask(task); 
    setShowModal(true);
  };

  const handleUpdateTask = async (updated: Task) => {
    await updateTask(updated.id, updated);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold uppercase font-mono mb-4">TaskFlow</h1>

      <button
        className="bg-blue-600 px-6 py-2 rounded-2xl hover:bg-blue-700 transition hover:cursor-pointer"
        onClick={() => {
          setEditTask(null); 
          setShowModal(true);
        }}
      >
        + Add Task
      </button>

      <div className="mt-10 w-full max-w-6xl max-h-[500px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700 pr-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditClick}
          />
        ))}
      </div>

      {showModal && (
        <AddTaskModal
          onClose={() => {
            setShowModal(false);
            setEditTask(null);
          }}
          onAdd={handleAddTask}
          onEdit={handleUpdateTask}
          editTask={editTask}
        />
      )}
    </div>
  );
}

export default App;
