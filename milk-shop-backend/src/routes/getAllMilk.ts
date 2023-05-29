import { getProductsData } from '../data/getProductsData';
import { Request, Response } from 'express';

export const getAllMilkRoute = (_req: Request, res: Response) => {
  const products = getProductsData();
  return res.status(200).json(products);
};
