import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/UserSlide";
import ProductReducer from "./slides/ProductSlide";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    user: userReducer,
  },
});
