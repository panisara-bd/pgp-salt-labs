import { ProductType } from '../../types';
const path = require('path');
const fs = require('fs');

export const getProductsData = (): ProductType[] => {
  const data = fs.readFileSync(path.resolve(__dirname, '../../../src/data/products.json'));
  const stringBuffer = data.toString();
  const parsed = JSON.parse(stringBuffer);
  const products = parsed.results.map((result: ProductType) => ({...result, image: 'milk.png'}))
  return products;
};
