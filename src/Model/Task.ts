import { Schema, model } from 'mongoose';

interface Task {
    name: string;
}

const userSchema = new Schema<Task>({
        name: {type: String, required: true},
    },

)

export const TaskModel = model<Task>('Task', userSchema);