import { Router } from 'express';
import { ProjectRoutes } from './projects/routes';

export class AppRoutes {
  public static get routes(): Router {
    const router = Router();
    router.use( '/api/v1/projects', ProjectRoutes.routes );

    return router;
  }
}