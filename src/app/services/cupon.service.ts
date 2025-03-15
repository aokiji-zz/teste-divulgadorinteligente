import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProductApiQuery } from '../interfaces/product.interface'
import { CouponApiResponse } from '../interfaces/cupom.model'

export const couponApi = createApi({
  reducerPath: 'couponApi',
  tagTypes: ["GET"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.divulgadorinteligente.com/api/coupons/public`
  }),
  endpoints: (build) => ({
    coupons: build.mutation<CouponApiResponse, ProductApiQuery>({
      query: ({ limit, sitename, start }) => ({
        url: `?sitename=${sitename}&&start=${start}&limit=${limit}&featured=false`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useCouponsMutation } = couponApi
