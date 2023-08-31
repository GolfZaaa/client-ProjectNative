import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../api/store";
import agent from "../api/agent";

interface reviewImages {
  id: number;
  image : string;
  reviewId : number;
}

interface user {
  id: number;
  userName : string;
  email : string;
}

interface reviews {
  id: number;
  userId: string;
  user : user;
  productId: string;
  texts:string;
  date:Date;
  star:number;
  reviewImages:reviewImages[];
}


interface products {
  id: number;
  name: string;
  price: number;
  quantityInStock: number;
  description: string;
  type: string;
  imageUrls: string[];
  image:string;
  reviews: reviews;
}

interface ProductState {
  products: products[];
  type: string[];
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  type: [],
};

export const fetchProductAsync = createAsyncThunk(
  "Product/Get",
  async (values) => {
    const response = await agent.Product.getproduct(values);
    return response;
  }
);

export const fetchTypeAsync = createAsyncThunk(
  "Product/GetTypes",
  async (values) => {
    const response = await agent.Product.getType(values);
    return response;
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // จัดการกับสถานะเริ่มต้นของการโหลดข้อมูล //////////Products
      .addCase(fetchProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      // จัดการเมื่อการโหลดข้อมูลเสร็จสิ้นสำเร็จ
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      // จัดการเมื่อเกิดข้อผิดพลาดในการโหลดข้อมูล
      .addCase(fetchProductAsync.rejected, (state, action) => {
        state.isLoading = false;
      })
      // จัดการกับสถานะเริ่มต้นของการโหลดข้อมูล //////////Type
      .addCase(fetchTypeAsync.pending, (state) => {
        state.isLoading = true;
      })
      // จัดการเมื่อการโหลดข้อมูลเสร็จสิ้นสำเร็จ
      .addCase(fetchTypeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.type = action.payload;
      })
      // จัดการเมื่อเกิดข้อผิดพลาดในการโหลดข้อมูล
      .addCase(fetchTypeAsync.rejected, (state, action) => {
        state.isLoading = false;
      });

  },
});

export const selectProducts = (state: RootState) => state.product.products;
export const selectProductsReview = (state: RootState) => state.product.products;
export const isLoading = (state: RootState) => state.product.isLoading;
export const selectType = (state: RootState) => state.product.type;

export default productSlice.reducer;
