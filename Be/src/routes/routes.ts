import express from "express";
import { test } from "../controllers/test";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task";
const router = express.Router();

router.get("/test",test);
router.get("/",getTasks);
router.post("/",createTask);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);
export default router;