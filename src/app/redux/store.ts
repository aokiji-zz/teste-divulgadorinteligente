import { configureStore } from '@reduxjs/toolkit'
import { productApi } from '../services/product.service'
import { generalReducer } from './slices/general.slice'
import { couponApi } from '../services/cupon.service'
export const store = configureStore({
  reducer: {
    generalReducer,

    [couponApi.reducerPath]: couponApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([couponApi.middleware])
    .concat([productApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
