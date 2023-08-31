  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import agent from "../api/agent";

  interface product {
    name : string;
    type : string;
    price : number;
    description : string;
    image : string;
  }


  interface orderItem {
    product:product;
    reviewStatus:string;
    OrderId:string;
  }

  interface Order {
    id: string;
    orderDate: Date;
    totalAmount: number;
    clientSecret: string;
    orderItem : orderItem[];
    orderStatus: number;
  }

  interface OrderState {
    isLoading: boolean;
    error: string | null;
    userId : string;
    totalAmount : number;
    order:Order[]
    address:any
    PaymentMethod : number;
    orderImage : any;
  }

  const initialState: OrderState = {
    isLoading: false,
    error: null,
    userId: '',
    totalAmount: 0,
    order: [],
    address:"",
    PaymentMethod : 0,
    orderImage : "",
  };


  export const CreateOrderUser = createAsyncThunk(
      "CartUser/CreateOrder",
      async ({
        userId,
        PaymentMethod,
        orderImage
      }: {
        userId: string; PaymentMethod : number; orderImage : any;
      }) => {
        try {
          const response = await agent.OrderUser.CreateOrder({
            userId,PaymentMethod,orderImage
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
        username,
      }: {
        username: string;
      }) => {
        try {
          const response = await agent.OrderUser.GetShowOrderUser({
            username,
          });
          // console.log(response);
          return response;
        } catch (error) {
          throw error;
        }
      }
    );

    export const GetOrderByUserId = createAsyncThunk(
      "Order/GetOrderByUserId",
      async ({
        userId,
      }: {
        userId: string;
      }) => {
        try {
          const response = await agent.OrderUser.GetOrderByUserId({
            userId,
          });
          // console.log(response);
          return response;
        } catch (error) {
          throw error;
        }
      }
    );

    export const UpdateOrderStatus = createAsyncThunk(
      "Order/UpdateOrderStatus",
      async (body: {
        id: number;
      }) => {
        try {
          const response = await agent.OrderUser.UpdateOrderStatus(body);
          // console.log(response);
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

        .addCase(GetOrderByUserId.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(GetOrderByUserId.fulfilled, (state, action) => {
          state.isLoading = false;
          state.order = action.payload;
        })
        .addCase(GetOrderByUserId.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || "Failed to Create Order.";
        })


        .addCase(UpdateOrderStatus.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(UpdateOrderStatus.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(UpdateOrderStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || "Failed to Create Order.";
        })
    },
  });

  export const selectorder = (state: any) => state.order.order;
  export const selectOrderImage = (state: any) => state.order.orderImage;


  export default orderSlice.reducer;
