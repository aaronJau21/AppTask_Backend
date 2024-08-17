import mongoose, { Document, PopulatedDoc, Schema } from 'mongoose';
import { ITask } from './Task.model';

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[];
}

const ProjectSchema: Schema = new Schema<IProject>(
  {
    projectName: {
      type: String,
      required: true,
      trim: true
    },
    clientName: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);


export const ProjectModel = mongoose.model<IProject>( 'Project', ProjectSchema, 'projects' );