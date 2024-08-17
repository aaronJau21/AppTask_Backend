import { Router } from 'express';
import { ProjectRoutes } from './projects/routes';
import { TasksRoutes } from './tasks/routes';

export class AppRoutes {
  public static get routes(): Router {
    const router = Router();
    router.use( '/api/v1/projects', ProjectRoutes.routes );
    router.use( '/api/v1/tasks', TasksRoutes.routes );

    return router;
  }
}