import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";

interface reviews {
  id: number;
  userId : string;
  productId : number;
  texts : string;
  date :Date;
  star : number;
  reviewImages : [];
}

interface ReviewState {
  isLoading: boolean;
  error: string | null;
  userId : string;
  Texts : string;
  Star : number;
  FormFiles: any[]; 
  Review:reviews[];
}

const initialState: ReviewState = {
  isLoading: false,
  error: null,
  userId: '',
  Texts:'',
  Star : 1,
  FormFiles:[],
  Review:[],
};


export const AddReviewUser = createAsyncThunk(
    "Review/AddProductComment",
    async ({
      userId,
      ProductId,
      Texts,
      Star,
      FormFiles,
      OrderItemId
    }: {
      userId: string; ProductId : number; Texts : any; Star:number; FormFiles:any[]; OrderItemId :string;
    }) => {
      try {
        const response = await agent.ReviewUser.AddReviewUser({
          userId,ProductId,Texts,Star,OrderItemId
        } , FormFiles);
        return response;
      } catch (error) {
        throw error;
      }
    }
  );

  export const GetReviewUserById = createAsyncThunk(
    "Review/GetProductReviewsId",
    async ({
      userId,
    }: {
      userId: string;
    }) => {
      try {
        const response = await agent.ReviewUser.GetReviewUserById({
          userId
        });
        return response;
      } catch (error) {
        throw error;
      }
    }
  );


const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
    .addCase(AddReviewUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AddReviewUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(AddReviewUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to Create Order.";
      })


      .addCase(GetReviewUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetReviewUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Review = action.payload;
      })
      .addCase(GetReviewUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to Create Order.";
      })
      
  },
});

// export const selectReviews = (state: RootState) => state.reivew.Review;

// export const selectReviewsImage = (state: RootState) => state.reivew.Review;


export default reviewSlice.reducer;
