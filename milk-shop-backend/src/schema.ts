const Joi = require('joi');

export const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().required(),
  storage: Joi.number(),
  id: Joi.string(),
});
