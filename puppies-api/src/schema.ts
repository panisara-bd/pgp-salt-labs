const Joi = require('joi'); 

export const schema = Joi.object().keys({
    breed: Joi.string().required(),
    name: Joi.string().required(),
    birthdate: Joi.date().less('now').iso().raw().required()
  });

