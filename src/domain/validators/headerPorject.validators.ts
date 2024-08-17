import { param } from 'express-validator';
import { validate } from './validate.validators';

export const headerProjectValidators = () => {
  return [
    param( 'id' ).isMongoId(),
    validate
  ];
};