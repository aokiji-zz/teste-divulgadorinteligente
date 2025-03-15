import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProductApiQuery, ProductApiResponse } from '../interfaces/product.interface'

export const productApi = createApi({
  reducerPath: 'productApi',
  tagTypes: ["GET"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.divulgadorinteligente.com/api/products`
  }),
  endpoints: (build) => ({
    products: build.mutation<ProductApiResponse, ProductApiQuery>({
      query: ({ limit, sitename, start, coupon, sellers }) => ({
        url: `?sitename=${sitename}&&start=${start}&limit=${limit}&coupon=${coupon || ''}&sellers=${sellers || ''}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useProductsMutation } = productApi
