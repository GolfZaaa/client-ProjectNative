import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../api/store';


interface User {
    id: string;
    name: string;
  }


interface AccountState {
    users: User[];
    isLoading: boolean;
    error: string | null;
  }
  
  const initialState: AccountState = {
    users: [],
    isLoading: false,
    error: null,
  };

  export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
    console.log('fetchUsersAsyn');
  });

  export const createUserAsync = createAsyncThunk('users/createUser', async (name: string) => {
    console.log('fetchUsersAsyn');
  });

  const accountSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsersAsync.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(fetchUsersAsync.fulfilled, (state, action) => {
            state.isLoading = false;
          })
          .addCase(fetchUsersAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch users.';
          })
          .addCase(createUserAsync.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(createUserAsync.fulfilled, (state, action) => {
            state.isLoading = false;
          })
          .addCase(createUserAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to create user.';
          });
        },
  });

  export const selectUsers = (state: RootState) => state.account.users;
  export const selectIsLoading = (state: RootState) => state.account.isLoading;
  export const selectError = (state: RootState) => state.account.error;
  export default accountSlice.reducer;