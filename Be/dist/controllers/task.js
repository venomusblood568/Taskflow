"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const uuid_1 = require("uuid");
let tasks = [];
const getTasks = (req, res) => {
    res.json(tasks);
};
exports.getTasks = getTasks;
const createTask = (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = {
            id: (0, uuid_1.v4)(),
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
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.createTask = createTask;
const updateTask = (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed, description } = req.body;
        let updateTask;
        tasks = tasks.map((task) => {
            if (task.id === id) {
                updateTask = Object.assign(Object.assign({}, task), { title, completed, description });
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
    }
    catch (error) {
        res.status(500).json({ messgae: "Something went wrong" });
        return;
    }
};
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
    try {
        const { id } = req.params;
        tasks = tasks.filter((task) => task.id !== id);
        res.status(200).json({ message: "Task Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Somthing went wrong" });
    }
};
exports.deleteTask = deleteTask;
