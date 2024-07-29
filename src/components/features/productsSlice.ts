import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/types";

const storedProducts = localStorage.getItem('products');

const saveProductsToLocalStorage = (products: Product[]) => {
  try {
    const serializedProducts = JSON.stringify(products);
    localStorage.setItem('products', serializedProducts);
  } catch (error) {
    console.error('Could not save products to localStorage:', error);
  }
};

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: storedProducts ? JSON.parse(storedProducts) : [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      saveProductsToLocalStorage(state.products);
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
      saveProductsToLocalStorage(state.products);
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(product => product.id !== action.payload);
      saveProductsToLocalStorage(state.products);
    },
  },
});

export const { setProducts, addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
