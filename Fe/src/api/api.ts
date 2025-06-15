import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/tasks",
});

export const getTasks = () => API.get("/");
export const createTask = (task: {
  title: string;
  description: string;
  completed: boolean;
}) => API.post("/", task);
export const deleteTask = (id: string) => API.delete(`/${id}`);
export const updateTask = (
  id: string,
  task: {
    title: string;
    description: string;
    completed: boolean;
  }
) => API.put(`/${id}`, task);
