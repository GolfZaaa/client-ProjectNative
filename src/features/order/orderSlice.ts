import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../api/store";
import agent from "../../api/agent";
import { useSelector} from 'react-redux';



interface CartState {
  isLoading: boolean;
  error: string | null;
  userId : string;
  totalAmount : number;
  order:[]
}

const initialState: CartState = {
  isLoading: false,
  error: null,
  userId: '',
  totalAmount: 0,
  order: []
};


export const CreateOrderUser = createAsyncThunk(
    "CartUser/CreateOrder",
    async ({
      userId,
    }: {
      userId: string;
    }) => {
      try {
        const response = await agent.OrderUser.CreateOrder({
          userId,
        });
        return response;
      } catch (error) {
        throw error;
      }
    }
  );

  export const GetOrderUser = createAsyncThunk(
    "Order/GetOrdersByUsername",
    async ({
      userId,
    }: {
      userId: string;
    }) => {
      try {
        const response = await agent.OrderUser.ShowOrderUser({
          userId,
        });
        console.log(response);
        return response;
      } catch (error) {
        throw error;
      }
    }
  );



const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
    .addCase(CreateOrderUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(CreateOrderUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(CreateOrderUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to Create Order.";
      })
      

      .addCase(GetOrderUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetOrderUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(GetOrderUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to Create Order.";
      })
  },
});

export const selectorder = (state: any) => state.order.order;

export default orderSlice.reducer;
