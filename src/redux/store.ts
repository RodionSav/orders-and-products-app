'use client';

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducer from "@/components/features/productsSlice";
import orderReducer from "@/components/features/ordersSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: orderReducer,
 },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;