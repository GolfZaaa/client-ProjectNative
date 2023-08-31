import { configureStore } from '@reduxjs/toolkit';
import accountreducer from '../account/accountSlice';
import productReducer from '../product/productSlice';
import cartReducer from '../cart/cartSlice';
import orderReducer from '../order/orderSlice';
import reviewReducer from '../review/reviewSlice';

const store = configureStore({
  reducer: {
    account: accountreducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    reivew: reviewReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;