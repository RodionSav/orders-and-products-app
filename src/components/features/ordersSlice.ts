import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchLocalStorageClient } from '../../utils/FetchClient/fetchClient';
import { Order } from '../../types/types';

export const loadOrdersFromLocalStorage = createAsyncThunk('orders/loadOrdersFromLocalStorage', async () => {
  const response = await fetchLocalStorageClient.get<Order[]>('orders');
  return response;
});

export const addOrderToLocalStorage = createAsyncThunk('orders/addOrderToLocalStorage', async (order: Order) => {
  const response = await fetchLocalStorageClient.post<Order>('orders', order);
  return response;
});

export const removeOrderFromLocalStorage = createAsyncThunk('orders/removeOrderFromLocalStorage', async (orderId: number) => {
  await fetchLocalStorageClient.delete<void>(`orders`, orderId); // Передаем `orderId` как данные
  return orderId;
});

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOrdersFromLocalStorage.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.orders = action.payload;
      })
      .addCase(addOrderToLocalStorage.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
      })
      .addCase(removeOrderFromLocalStorage.fulfilled, (state, action: PayloadAction<number>) => {
        state.orders = state.orders.filter(order => order.id !== action.payload);
      });
  },
});

export default ordersSlice.reducer;
