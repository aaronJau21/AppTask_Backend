import { body } from 'express-validator';
import { validate } from '../validate.validators';

export const projectValidatorsUpdate = () => {
  return [
    body( 'projectName' ).optional().trim().isString().isLength( { min: 2 } ).withMessage( 'Project Name is required' ),
    body( 'clientName' ).optional().isString().isLength( { min: 2 } ).withMessage( 'Client Name is required' ),
    body( 'description' ).optional().isString().isLength( { min: 2 } ).withMessage( 'Description is required' ),
    validate
  ];
};