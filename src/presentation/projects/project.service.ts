import { ProjectModel } from '../../data';
import { CreateProjectDto, CustomError, UpdateProjectDto } from '../../domain';

export class ProjectService {

  constructor() { }

  async createProject( createProjectDto: CreateProjectDto ) {

    try {
      const project = new ProjectModel( {
        ...createProjectDto
      } );

      await project.save();

      return {
        id: project.id,
        name: project.projectName,
        client: project.clientName,
        description: project.description
      };
    } catch ( error ) {
      console.log( error );
      throw CustomError.internalServerError( `${ error }` );
    }

  }

  async getProjects() {

    try {
      const projects = await ProjectModel.find();

      return { projects };

    } catch ( error ) {
      console.log( error );
      throw CustomError.internalServerError( `${ error }` );
    }

  }

  async getProjectById( id: string ) {

    try {
      const projects = await ProjectModel.findById( id ).select( 'projectName clientName description' ).populate('tasks');

      return projects;

    } catch ( error ) {
      console.log( error );
      throw CustomError.internalServerError( `${ error }` );
    }

  }

  async updateProject( id: string, updateProjectDto: UpdateProjectDto ) {
    try {
      const project = await ProjectModel.findById( id );
      if ( !project ) {
        throw CustomError.badRequest( 'Project not found' );
      }

      this.assignUpdatedProperties( project, updateProjectDto );

      await project.save();

      return {
        id: project.id,
        name: project.projectName,
        client: project.clientName,
        description: project.description
      };
    } catch ( error ) {
      console.log( error );
      throw CustomError.internalServerError( `${ error }` );
    }
  }

  async deleteProject( id: string ) {
    try {
      await ProjectModel.findByIdAndDelete( id );

      return {
        msg: 'Se elimino correctamente'
      };

    } catch ( error ) {
      console.log( error );
      throw CustomError.internalServerError( `${ error }` );
    }
  }

  private assignUpdatedProperties( project: any, updateProjectDto: UpdateProjectDto ) {
    const { projectName, clientName, description } = updateProjectDto;

    if ( projectName !== undefined ) {
      project.projectName = projectName;
    }
    if ( clientName !== undefined ) {
      project.clientName = clientName;
    }
    if ( description !== undefined ) {
      project.description = description;
    }
  }



}