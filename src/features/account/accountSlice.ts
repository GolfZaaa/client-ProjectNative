import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  user: User | null;
  }
  
  const initialState: AccountState = {
    user: null
  };

  //FieldValues พารามิเตอร์รับหลายค่าที่ส่งเข้ามา เช่น await dispatch(signInUser(data));
export const signInUser = createAsyncThunk<User,FieldValues>(
  'account/fetchCurrentUser',
  async (data, thunkAPI) => {
      try {
          const userDto = await agent.Account.login(data);
          const {basket, ...user} = userDto; // ...user หมายถึงนำค่าที่เหลือใส่ไว้ใน user
          if (basket) thunkAPI.dispatch(setBasket(basket));
          localStorage.setItem('user', JSON.stringify(user));
          return user;
      } catch (error: any) {
          return thunkAPI.rejectWithValue({error: error.data});
      }
  }
)

  const accountSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
      decrement: (state) => {
        state.value -= 1;
      },
      incrementByAmount: (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      },
    },
  });
  
  export const { increment, decrement, incrementByAmount } = accountSlice.actions;
  export default accountSlice.reducer;