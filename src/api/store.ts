import { configureStore } from '@reduxjs/toolkit';
import accountreducer from '../features/product/accountSlice';
import productReducer from '../features/product/productSlice';

const store = configureStore({
  reducer: {
    account: accountreducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;