import { getProductsData } from '../data/getProductsData';
import { Request, Response } from 'express';

export const fitlerTypesRoute = (_req: Request, res: Response) => {
  const products = getProductsData();

  const typeResults = products
    .map((product) => product.type)
    .filter((value, index, types) => types.indexOf(value) === index);

  return res.status(200).json(typeResults);
};
