export interface CouponAttributes {
  updatedAt: string;
  seller: string;
  code: string;
  discount: string;
  title: string;
  description: string | null;
  link: string | null;
  featured: boolean;
  createdAt: string;
  discount_type: string;
}

export interface Coupon {
  id: number;
  attributes: CouponAttributes;
}

export interface CouponApiResponse {
  data: Coupon[];
  meta: Record<string, unknown>;
}

export interface ProductApiQuery {
  sitename: string
  start: number
  limit: number
  cupon?: string
}