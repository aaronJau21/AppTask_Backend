import { Schema } from 'mongoose';

export class CreaateTaskDto {

  name: string;
  description: string;
  state?: string;
  project: Schema.Types.ObjectId;

  constructor( name: string, description: string, state: string, project: Schema.Types.ObjectId, ) {
    this.name = name;
    this.description = description;
    this.state = state;
    this.project = project;
  }

}