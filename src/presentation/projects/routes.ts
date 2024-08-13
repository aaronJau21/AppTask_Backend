import { Router } from 'express';
import { ProjectController } from './controller';

export class ProjectRoutes {

  public static get routes(): Router {

    const router = Router();
    const controller = new ProjectController();

    router.post( '/create', controller.register );

    return router;

  }

}