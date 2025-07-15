import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: { admin: null },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    clearAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("admin");
    },
  },
});

export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
