import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types/types';

const storedOrders = localStorage.getItem('orders');

const saveOrdersToLocalStorage = (orders: Order[]) => {
  try {
    const serializedOrders = JSON.stringify(orders);
    localStorage.setItem('orders', serializedOrders);
  } catch (error) {
    console.error('Could not save orders to localStorage:', error);
  }
};

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: storedOrders ? JSON.parse(storedOrders) : [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
      saveOrdersToLocalStorage(state.orders);
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
      saveOrdersToLocalStorage(state.orders);
    },
    removeOrder(state, action: PayloadAction<number>) {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
      saveOrdersToLocalStorage(state.orders);
    },
  },
});

export const { setOrders, addOrder, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
