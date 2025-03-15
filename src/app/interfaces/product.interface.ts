interface ProductAttributes {
  updatedAt: string;
  title: string;
  image: string;
  price_from: string;
  price: string;
  link: string;
  uuid: string;
  createdAt: string;
  seller: string;
  highlight: boolean;
  free_shipping: boolean;
  free_shipping_prime: boolean;
  coupon: string | null;
  hidePrice: boolean;
  extraInfo: string | null;
  shipping: string | null;
  installment: string | null;
  updatedAt_timestamp: string | null;
  updatedAt_unixTimestamp: number;
  initial_link: string | null;
}

interface Product {
  id: number;
  attributes: ProductAttributes;
}

export interface ProductApiResponse {
  data: Product[];
  meta: Record<string, unknown>;
}


export interface ProductApiQuery {
  sitename: string
  start: number
  limit: number
  coupon?: string
  sellers?: string
}