import { Request, Response } from 'express';

export class ProjectController {

  public register( req: Request, res: Response ) {


    return res.send( {
      'msg': 'hola Nundo'
    } );

  }

}