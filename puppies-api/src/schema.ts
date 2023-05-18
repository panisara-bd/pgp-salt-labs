const Joi = require('joi');

export const schema = Joi.object().keys({
  breed: Joi.string().required(),
  name: Joi.string().required(),
  birthdate: Joi.date().less('now').iso().raw().required(),
  image: Joi.string().uri(),
  allergies: Joi.string(),
  favFood: Joi.string(),
  favToy: Joi.string(),
  spayed: Joi.string(),
  about: Joi.string(),
});
