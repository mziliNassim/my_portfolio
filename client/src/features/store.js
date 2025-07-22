import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import statsReducer from "./statsSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    stats: statsReducer,
  },
});
