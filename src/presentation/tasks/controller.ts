import { Request, Response } from 'express';
import { ITask } from '../../data/mongo/models/Task.model';
import { CreaateTaskDto, CustomError, UpdateTasDto } from '../../domain';
import { TaskServide } from './tasks.service';

export class TasksController {

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json( { error: error.message } );
    }
    console.log( `${ error }` );
    return res.status( 500 ).json( { error: 'Internal Server Error' } );
  };

  constructor(
    private readonly taskService: TaskServide
  ) { }

  public createTask = ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { name, description, state, project } = req.body as ITask;

    const createTaskDto = new CreaateTaskDto( name, description, state, project );
    this.taskService.createTask( createTaskDto, id )
      .then( task => res.status( 201 ).json( task ) )
      .catch( error => this.handleError( error, res ) );

  };

  public getTasksByProject = ( req: Request, res: Response ) => {
    const { id } = req.params;
    this.taskService.getTasksByProject( id )
      .then( tasks => res.status( 201 ).json( tasks ) )
      .catch( error => this.handleError( error, res ) );
  };

  public getTaskById = ( req: Request, res: Response ) => {

    const { id, idTask } = req.params;

    this.taskService.getTaskById( id, idTask )
      .then( task => res.status( 200 ).json( task ) )
      .catch( error => this.handleError( error, res ) );

  };

  public updateTask = ( req: Request, res: Response ) => {
    const { id, idTask } = req.params;

    const { name, description, state } = req.body;

    const updateTaskDto = new UpdateTasDto();
    updateTaskDto.name = name;
    updateTaskDto.description = description;
    updateTaskDto.state = state;

    this.taskService.updateTask( id, idTask, updateTaskDto )
      .then( task => res.status( 201 ).json( task ) )
      .catch( error => this.handleError( error, res ) );
  };


  public deleteTask = ( req: Request, res: Response ) => {
    const { id, idTask } = req.params;

    this.taskService.deleteTask( id, idTask )
      .then( resp => res.status( 200 ).json( resp ) )
      .catch( error => this.handleError( error, res ) );

  };


}