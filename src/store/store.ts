import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
