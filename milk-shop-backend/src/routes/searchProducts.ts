const Joi = require('joi');
import { getProductsData } from '../data/getProductsData';
import { Request, Response } from 'express';

export const schema = Joi.object().keys({
  query: Joi.string().allow(''),
  types: Joi.array().items(Joi.string()),
  offset: Joi.number().integer().min(0).default(0),
  limit: Joi.number().integer().min(1).max(9).default(9),
});

export const searchProductsRoute = (req: Request, res: Response) => {
  const {
    value: { query, types, offset, limit },
    error,
  } = schema.validate(req.query);

  if (error) {
    res.status(400).json(error.details);
    return;
  }

  const products = getProductsData();

  const results = products
    .filter(
      ({ name }) =>
        !query || name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    .filter(({ type }) => !types || types.length === 0 || types.includes(type));

  const paginatedResults = results.slice(offset, offset + limit);

  res.status(200).json({
    count: results.length,
    products: paginatedResults,
  });
};
