'use client';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchLocalStorageClient } from '../../utils/FetchClient/fetchClient';
import { Product } from '../../types/types';

export const loadProductsFromLocalStorage = createAsyncThunk('products/loadProductsFromLocalStorage', async () => {
  const response = await fetchLocalStorageClient.get<Product[]>('products');
  return response;
});


interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProductsFromLocalStorage.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      })

  },
});

export default productsSlice.reducer;
