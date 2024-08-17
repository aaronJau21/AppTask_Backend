import { body } from 'express-validator';
import { validate } from '../validate.validators';


export const updateTaskValidator = () => {

  return [
    body( 'name' ).optional().isString().isLength( { min: 2 } ),
    body( 'description' ).optional().isString().isLength( { min: 2 } ),
    body( 'state' ).optional().isString().isLength( { min: 2 } ),
    validate
  ];

};