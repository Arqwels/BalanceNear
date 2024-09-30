import { configureStore } from "@reduxjs/toolkit";
import { nearApi } from "./api/nearApi";
import { addressApi } from "./api/adressApi";

const store = configureStore({
  reducer: {
    [addressApi.reducerPath]: addressApi.reducer,
    [nearApi.reducerPath]: nearApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(addressApi.middleware, nearApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;