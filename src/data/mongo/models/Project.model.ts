import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema(
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
  },
  {
    timestamps: true
  }
);


export const Project = mongoose.model( 'Project', ProjectSchema, 'projects' );