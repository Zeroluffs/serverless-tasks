"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const Task_1 = require("../Model/Task");
class TaskController {
    getAllTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield Task_1.TaskModel.find();
                res.status(200).json(tasks);
            }
            catch (err) {
                res.status(404).json({ message: err.message });
            }
        });
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = req.body;
            if (!task.name || task.name === "" || typeof task.name !== "string") {
                return res.status(400).json({
                    message: "Task name is required. It must be a string and cannot be empty.",
                });
            }
            const newUser = new Task_1.TaskModel(task);
            try {
                yield newUser.save();
                res.status(201).json(newUser);
            }
            catch (err) {
                res.status(409).json({ message: err === null || err === void 0 ? void 0 : err.message });
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield Task_1.TaskModel.findById(req.params.id);
                if (!task) {
                    return res.status(404).json({ message: "Task not found" });
                }
                yield Task_1.TaskModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                res.status(200).json({ message: "Task updated" });
            }
            catch (err) {
                res.status(409).json({ message: err.message });
            }
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield Task_1.TaskModel.findById(req.params.id);
                if (!task) {
                    return res.status(404).json({ message: "Task not found" });
                }
                yield Task_1.TaskModel.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: "Task deleted" });
            }
            catch (err) {
                res.status(409).json({ message: err.message });
            }
        });
    }
}
exports.TaskController = TaskController;
