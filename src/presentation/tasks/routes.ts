import { Router } from 'express';
import { TasksController } from './controller';
import { createTaskValidator, headerProjectValidators, headerTaskValidators, updateTaskValidator } from '../../domain';
import { TaskServide } from './tasks.service';

export class TasksRoutes {

  public static get routes(): Router {

    const router = Router();
    const taskService = new TaskServide;
    const controller = new TasksController( taskService );


    router.post( '/:id/task',
      headerProjectValidators(),
      createTaskValidator(),
      controller.createTask
    );

    router.get( '/:id/task',
      headerProjectValidators(),
      controller.getTasksByProject
    );

    router.get( '/:id/task/:idTask',
      headerProjectValidators(),
      headerTaskValidators(),
      controller.getTaskById
    );

    router.patch( '/:id/task/:idTask',
      headerProjectValidators(),
      headerTaskValidators(),
      updateTaskValidator(),
      controller.updateTask
    );

    router.delete( '/:id/task/:idTask',
      headerProjectValidators(),
      headerTaskValidators(),
      controller.deleteTask
    );

    return router;

  }

}