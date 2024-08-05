import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchLocalStorageClient } from "../../utils/FetchClient/fetchClient";
import { Order } from "../../types/types";

const initialOrders = [
  {
    id: 1,
    title: "Order 1",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return initialProducts.filter((product) => product.order === this.id);
    },
  },
  {
    id: 2,
    title: "Order 2",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return initialProducts.filter((product) => product.order === this.id);
    },
  },
  {
    id: 3,
    title: "Order 3",
    date: "2017-06-29 12:09:33",
    description: "desc",
    get products() {
      return initialProducts.filter((product) => product.order === this.id);
    },
  },
];

const initialProducts = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: "pathToFile.jpg",
    title: "Product 1",
    type: "Monitors",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33",
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 },
    ],
    order: 1,
    date: "2017-06-29 12:09:33",
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: 1,
    photo: "pathToFile.jpg",
    title: "Product 1",
    type: "Monitors",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33",
    },
    price: [
      { value: 100, symbol: "USD", isDefault: 0 },
      { value: 2600, symbol: "UAH", isDefault: 1 },
    ],
    order: 2,
    date: "2017-06-29 12:09:33",
  },
];

if (typeof window !== "undefined") {
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify(initialOrders));
  }

  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }
}

export const loadOrdersFromLocalStorage = createAsyncThunk(
  "orders/loadOrdersFromLocalStorage",
  async () => {
    if (typeof window !== "undefined") {
      const response = await fetchLocalStorageClient.get<Order[]>("orders");
      return response;
    }
    return initialOrders;
  }
);

export const addOrderToLocalStorage = createAsyncThunk(
  "orders/addOrderToLocalStorage",
  async (order: Order) => {
    if (typeof window !== "undefined") {
      const response = await fetchLocalStorageClient.post<Order>(
        "orders",
        order
      );
      return response;
    }
    return order;
  }
);

export const removeOrderFromLocalStorage = createAsyncThunk(
  "orders/removeOrderFromLocalStorage",
  async (orderId: number) => {
    if (typeof window !== "undefined") {
      await fetchLocalStorageClient.delete<void>("orders", orderId);
    }
    return orderId;
  }
);

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: initialOrders,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadOrdersFromLocalStorage.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders = action.payload;
        }
      )
      .addCase(
        addOrderToLocalStorage.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.orders.push(action.payload);
        }
      )
      .addCase(
        removeOrderFromLocalStorage.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.orders = state.orders.filter(
            (order) => order.id !== action.payload
          );
        }
      );
  },
});

export default ordersSlice.reducer;
