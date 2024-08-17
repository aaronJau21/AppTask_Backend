import { param } from 'express-validator';
import { validate } from './validate.validators';

export const headerTaskValidators = () => {
  return [
    param( 'idTask' ).isMongoId(),
    validate
  ];
};