import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/redux/services/baseApi";
import authReducer from "@/redux/features/auth/authSlice";
import cartReducer from "@/redux/features/cart/cartSlice";
import wishlistReducer from "@/redux/features/wishlist/wishlistSlice";
import uiReducer from "@/redux/features/ui/uiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};