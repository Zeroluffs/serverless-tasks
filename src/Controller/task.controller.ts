import { TaskModel } from "../Model/Task";
import { Request, Response } from "express";

export class TaskController {
  public async getAllTask(req: Request, res: Response) {
    try {
      const tasks = await TaskModel.find();
      res.status(200).json(tasks);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  public async createTask(req: Request, res: Response) {
    const task = req.body;
    if (!task.name || task.name === "" || typeof task.name !== "string") {
      return res.status(400).json({
        message:
          "Task name is required. It must be a string and cannot be empty.",
      });
    }
    const newUser = new TaskModel(task);
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err: any) {
      res.status(409).json({ message: err?.message });
    }
  }
  public async updateTask(req: Request, res: Response) {
    try {
      const task = await TaskModel.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      await TaskModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
        res.status(200).json({ message: "Task updated" });
    } catch (err: any) {
      res.status(409).json({ message: err.message });
    }
  }
  public async deleteTask(req: Request, res: Response) {
      try {
      const task = await TaskModel.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      await TaskModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Task deleted" });
    } catch (err: any) {
      res.status(409).json({ message: err.message });
    }
  }
}
