import { createSlice } from "@reduxjs/toolkit";

export const statsSlice = createSlice({
  name: "stats",
  initialState: { stats: null },
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    clearStats: (state) => {
      state.stats = null;
    },
  },
});

export const { setStats, clearStats } = statsSlice.actions;
export default statsSlice.reducer;
