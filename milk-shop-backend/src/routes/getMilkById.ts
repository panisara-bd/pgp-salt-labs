import { getProductsData } from '../data/getProductsData';
import { Request, Response } from 'express';

export const getMilkByIdRoute = (req: Request, res: Response) => {
  const id = req.params.id;
  const products = getProductsData().results;
  const product = products.find((p) => p.id === id);
  if (!product) {
    res.sendStatus(404);
    return;
  }
  return res.status(200).json(product);
};
