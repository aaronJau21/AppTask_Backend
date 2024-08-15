import { body } from 'express-validator';
import { validate } from '../validate.validators';

export const projectValidators = () => {
  return [
    body( 'projectName' ).trim().isString().isLength( { min: 2 } ).withMessage( 'Project Name is required' ),
    body( 'clientName' ).isString().isLength( { min: 2 } ).withMessage( 'Client Name is required' ),
    body( 'description' ).isString().isLength( { min: 2 } ).withMessage( 'Description is required' ),
    validate
  ];
};