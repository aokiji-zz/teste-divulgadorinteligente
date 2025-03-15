import { ProductApiResponse } from "../interfaces/product.interface";

const extractNumberFromPrice = (priceString: string): number => {
  const cleanedString = priceString.replace('R$', '').trim();
  const numberString = cleanedString.replace(',', '.');
  return parseFloat(numberString);
};

const calculateTotalPrice = (cart: Array<ProductApiResponse['data'][0]>): number => {
  return cart.reduce((total, item) => {
    return total + extractNumberFromPrice(item.attributes.price);
  }, 0);
};

export default calculateTotalPrice;