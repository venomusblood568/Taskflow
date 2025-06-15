import { Request, Response } from "express";
import { Task } from "../models/model";
import { v4 as uuidv4 } from "uuid";

let tasks: Task[] = [];

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
    };

    tasks.push(newTask);
    res.status(200).json({
      message: "New task Added Successfully",
      title: newTask.title,
      description: newTask.description,
      id: newTask.id,
      completed: newTask.completed,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTask = (req:Request,res:Response) => {
    try {
        const { id } = req.params;
        const { title, completed, description } = req.body;

        let updateTask: Task | undefined;

        tasks = tasks.map((task) => {
          if (task.id === id) {
            updateTask = { ...task, title, completed, description };
            return updateTask;
          }
          return task;
        });

        if (!updateTask) {
          res.status(404).json({ messgae: "Task not found" });
          return;
        }

        res.status(200).json({
          message: "Task updated",
          id: updateTask.id,
          title: updateTask.title,
          description: updateTask.description,
          completed: updateTask.completed,
        }); 
    } catch (error) {
        res.status(500).json({messgae:"Something went wrong"})
        return;
    }
}

export const deleteTask = (req:Request,res:Response) => {
    try {
        const { id } = req.params;
        tasks = tasks.filter((task) => task.id !== id);
        res.status(200).json({ message: "Task Deleted" });
    } catch (error) {
        res.status(500).json({message:"Somthing went wrong"})
    }
}