import { body } from 'express-validator';
import { validate } from '../validate.validators';


export const createTaskValidator = () => {

  return [
    body( 'name' ).isString().isLength( { min: 2 } ),
    body( 'description' ).isString().isLength( { min: 2 } ),
    body( 'state' ).optional().isString().isLength( { min: 2 } ),
    validate
  ];

};