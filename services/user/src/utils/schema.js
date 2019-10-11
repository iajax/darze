import Joi from '@hapi/joi';

export default Joi.object({
  input: Joi.object({
    first_name: Joi.string()
      .required()
      .label('firstName'),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .label('Username'),
    email: Joi.string()
      .email()
      .label('Email'),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .label('Password'),
  }),
});
