import { Request, Response } from 'express';
import { ProjectService } from './project.service';
import { CreateProjectDto, CustomError, UpdateProjectDto } from '../../domain';

export class ProjectController {

  constructor(
    private readonly projectService: ProjectService
  ) { }

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json( { error: error.message } );
    }
    console.log( `${ error }` );
    return res.status( 500 ).json( { error: 'Internal Server Error' } );
  };

  public register = ( req: Request, res: Response ) => {

    const { projectName, clientName, description } = req.body;

    const createProjectDto = new CreateProjectDto( projectName, clientName, description );

    this.projectService.createProject( createProjectDto )
      .then( ( project ) => res.status( 201 ).json( project ) )
      .catch( error => this.handleError( error, res ) );

  };

  public getProjects = ( req: Request, res: Response ) => {
    this.projectService.getProjects()
      .then( projects => res.status( 200 ).json( projects ) )
      .catch( error => this.handleError( error, res ) );
  };

  public getProjectById = ( req: Request, res: Response ) => {
    const { id } = req.params;
    this.projectService.getProjectById( id )
      .then( project => res.status( 201 ).json( project ) )
      .catch( error => this.handleError( error, res ) );
  };

  public updateProject = ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { projectName, clientName, description } = req.body;

    const updateProjectDto = new UpdateProjectDto();
    updateProjectDto.projectName = projectName;
    updateProjectDto.clientName = clientName;
    updateProjectDto.description = description;

    this.projectService.updateProject( id, updateProjectDto )
      .then( project => res.status( 201 ).json( project ) )
      .catch( error => this.handleError( error, res ) );

  };

  public deleteProject = ( req: Request, res: Response ) => {
    const { id } = req.params;
    this.projectService.deleteProject( id )
      .then( project => res.status( 201 ).json( project ) )
      .catch( error => this.handleError( error, res ) );
  };

}