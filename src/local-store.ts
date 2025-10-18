import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app1Local",
  initialState: { clicks: 0 },
  reducers: {
    increment: (s) => {
      s.clicks += 1;
    },
  },
});

export const { increment } = slice.actions;

export const localStore = configureStore({
  reducer: { app1Local: slice.reducer },
});

export type LocalState = ReturnType<typeof localStore.getState>;
