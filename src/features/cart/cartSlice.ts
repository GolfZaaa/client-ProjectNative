import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../api/store";
import agent from "../../api/agent";

interface Product {
  id: number;
  name: string;
  price: number;
  quantityInStock: number;
  description: string;
  type: string;
  calorie: number;
  imageUrls: string[];
}

interface CartItem {
  id: number;
  amount: number;
  productId: number;
  product: Product;
  cartId: string;
  cart: Cart;
}

interface Cart {
  id: string;
  items: CartItem[];
  created: string;
  userId: string;
}

interface CartState {
  isLoading: boolean;
  error: string | null;
  carts: Cart[];
}

const initialState: CartState = {
  isLoading: false,
  error: null,
  carts: [],
};

export const getCartAsync = createAsyncThunk(
  "CartUser/GetCartByUsername",
  async ({ userId }: { userId: string }) => {
    try {
      const response = await agent.CartUser.getCart({ userId });
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const addProductAsync = createAsyncThunk(
  "CartUser/AddItemToCart",
  async ({
    userId,
    amount,
    productId,
  }: {
    userId: string;
    amount: number;
    productId: number;
  }) => {
    try {
      const response = await agent.CartUser.AddItem({
        userId,
        amount,
        productId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
);


export const deleteProductAsyncAll = createAsyncThunk(
  "CartUser/DeleteItemToCartall",
  async ({
    userId,
    productId,
  }: {
    userId: string;
    productId: number;
  }) => {
    try {
      const response = await agent.CartUser.DeleteItemAll({
        userId,
        productId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "CartUser/DeleteItemToCart",
  async ({
    userId,
    amount,
    productId,
  }: {
    userId: string;
    amount: number;
    productId: number;
  }) => {
    try {
      const response = await agent.CartUser.DeleteItem({
        userId,
        amount,
        productId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.carts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.carts = action.payload;
        console.log("😘", state.carts);
      })
      .addCase(getCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to get cart.";
      })

      .addCase(addProductAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to get cart.";
      })

      .addCase(deleteProductAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to get cart.";
      })


      .addCase(deleteProductAsyncAll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProductAsyncAll.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProductAsyncAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to get cart.";
      })

  },
});

export const selectIsLoading = (state: any) => state.cart.isLoading;
export const selectError = (state: any) => state.cart.error;
export const selectCartItems = (state: any) => state.cart.carts;


export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
