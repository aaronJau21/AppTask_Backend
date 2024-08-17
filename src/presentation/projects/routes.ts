import { Router } from 'express';
import { ProjectController } from './controller';
import { ProjectService } from './project.service';
import { headerProjectValidators, projectValidators, projectValidatorsUpdate } from '../../domain';

export class ProjectRoutes {

  public static get routes(): Router {

    const router = Router();
    const projectService = new ProjectService;
    const controller = new ProjectController( projectService );

    router.post( '/create', projectValidators(), controller.register );
    router.get( '/', controller.getProjects );
    router.get( '/:id', headerProjectValidators(), controller.getProjectById );
    router.patch( '/:id', headerProjectValidators(), projectValidatorsUpdate(), controller.updateProject );
    router.delete( '/:id', headerProjectValidators(), controller.deleteProject );

    return router;

  }

}