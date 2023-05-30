const Joi = require('joi');
import { getProductsData } from '../data/getProductsData';
import { Request, Response } from 'express';

export const schema = Joi.object().keys({
  query: Joi.string(),
  types: Joi.array().items(Joi.string()),
});

export const searchProductsRoute = (req: Request, res: Response) => {

  const {value: {query, types}} = schema.validate(req.query);
  const products = getProductsData();

  const results = products.filter(({ name }) =>
    !query || name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  ).filter(({type}) => !types || types.lenght === 0 || types.includes(type));


  if (results.length <= 0) {
    res.status(404).json({ message: 'No milk products with this name' });
    return;
  }
  res.status(200).json(results);
};
