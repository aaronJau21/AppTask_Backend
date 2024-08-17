import { ProjectModel } from '../../data';
import { TaskModel, state } from '../../data/mongo/models/Task.model';
import { CreaateTaskDto, CustomError, UpdateTasDto } from '../../domain';

export class TaskServide {

  async createTask( creaateTaskDto: CreaateTaskDto, id: string ) {

    const project = await ProjectModel.findById( id );

    if ( !project ) throw CustomError.notFound( 'Not found Project' );

    try {
      const task = new TaskModel( { ...creaateTaskDto } );
      task.project = project.id;
      project.tasks.push( task.id );
      Promise.allSettled( [ task.save(), project.save() ] );
      return { task };

    } catch ( error ) {
      console.log( error );
      throw CustomError.internalServerError( 'Internal Error' );
    }
  }

  async getTasksByProject( id: string ) {

    const project = await ProjectModel.findById( id );

    if ( !project ) throw CustomError.notFound( 'Not found Project' );

    try {
      const tasks = await TaskModel.find( { project } ).populate( 'project' );

      return { tasks };

    } catch ( error ) {
      console.log( error );
      throw CustomError.internalServerError( 'Internal Error' );
    }

  }

  async getTaskById( idProject: string, id: string ) {
    const project = await ProjectModel.findById( idProject );

    if ( !project ) throw CustomError.notFound( 'Not found Project' );

    try {
      const task = await TaskModel.findById( id ).populate( 'project' );

      return { task };
    } catch ( error ) {
      console.log( error );
      throw CustomError.internalServerError( 'Internal Error' );
    }
  }

  async updateTask( idProject: string, id: string, updateTasDto: UpdateTasDto ) {

    const project = await ProjectModel.findById( idProject );

    if ( !project ) throw CustomError.notFound( 'Not found Project' );

    try {
      const task = await TaskModel.findById( id );
      if ( !task ) throw CustomError.notFound( 'Task not found' );
      this.assignUpdatedProperties( task, updateTasDto );

      await task.save();
      return {
        id: task.id,
        name: task.name,
        description: task.description,
        state: task.state
      };

    } catch ( error ) {
      console.log( error );
      throw CustomError.internalServerError( 'Internal Error' );
    }

  }

  async deleteTask( idProject: string, id: string ) {
    const project = await ProjectModel.findById( idProject );

    if ( !project ) throw CustomError.notFound( 'Not found Project' );

    try {

      await TaskModel.findOneAndDelete( { _id: id } );

      return 'Deleted Successfully';

    } catch ( error ) {
      console.log( error );
      throw CustomError.internalServerError( 'Internal Error' );
    }
  }

  private assignUpdatedProperties( task: any, updateTasDto: UpdateTasDto ) {

    const { name, description, state } = updateTasDto;

    if ( name !== undefined ) task.name = name;
    if ( description !== undefined ) task.description = description;
    if ( state !== undefined ) task.state = state;

  }
}