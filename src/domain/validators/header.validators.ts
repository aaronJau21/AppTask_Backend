import { param } from 'express-validator';
import { validate } from './validate.validators';

export const headerValidators = () => {
  return [
    param( 'id' ).isMongoId(),
    validate
  ];
};