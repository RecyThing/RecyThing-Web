import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./LoginSlice";

export const store = configureStore({
  reducer: {
    auth: loginSlice,
  },
});
