import { ProductType, ProductsDataType } from '../../types';

const fs = require('fs');

export const getProductsData = (): ProductsDataType => {
  const data = fs.readFileSync('src/data/products.json');
  const stringBuffer = data.toString();
  const parsed = JSON.parse(stringBuffer);
  const products = parsed.results.map((result: ProductType) => ({...result, image: 'milk.png'}))
  return products;
};
