import mongoose, { Document, Schema } from 'mongoose';

export enum state {
  PENDING = 'pending',
  ON_HOLD = 'onHold',
  IN_PROGRESS = 'inProgress',
  UNDER_REVIEW = 'underReview',
  COMPLETED = 'completed'
}

export interface ITask extends Document {
  name: string;
  description: string;
  state: state;
  project: Schema.Types.ObjectId;

}

const TaskSchema: Schema = new Schema<ITask>(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    state: {
      type: String,
      enum: state,
      default: state.PENDING
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  },
  {
    timestamps: true
  }
);

export const TaskModel = mongoose.model<ITask>( 'Task', TaskSchema, 'tasks' );