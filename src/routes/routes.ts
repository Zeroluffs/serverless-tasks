import express from "express";
import {TaskController} from "../Controller/task.controller";
const router = express.Router();

const taskController = new TaskController();

router.get("/", taskController.getAllTask);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
export default router;