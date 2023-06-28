import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../api/store";
import agent from "../../api/agent";

interface AccountState {
  email: string;
  role: string;
  username: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  token: string | null; // เพิ่มพร็อปเพอร์ตี้ token ที่ใช้เก็บโทเค็น
}

const initialState: AccountState = {
  email: "",
  role: "Member",
  username: "",
  password: "",
  isLoading: false,
  error: null,
  token: null,
};

export const loginAsync = createAsyncThunk(
  "Authentication/Login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await agent.Account.login({ username, password });
    console.log(response);
    return response;
  }
);

export const registerAsync = createAsyncThunk(
  "Authentication/Register",
  async ({
    email,
    role,
    username,
    password,
  }: {
    email: string;
    role: string;
    username: string;
    password: string;
  }) => {
    const response = await agent.Account.register({
      email,
      role,
      username,
      password,
    });
    console.log(response);
    return response;
  }
);

export const confirmUserAsync = createAsyncThunk(
  "Authentication/ConfirmEmail",
  async ({ email, emailConfirmationToken }: { email: string; emailConfirmationToken: string }) => {
    try {
      const response = await agent.Account.confirm({ email, emailConfirmationToken });
      console.log(response);
      return response;
    } catch (error) {
      console.log("😂😂", error);
      throw error;
    }
  }
);

const accountSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload.email; // เก็บข้อมูลผู้ใช้งานใน state
        state.token = action.payload.token; // เก็บค่าโทเค็นใน state
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to login users.";
        console.log(state.error);
      })

      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Successfully registered");
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to register users.";
      })

      .addCase(confirmUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        console.log("Successfully confirmed user");
      })
      .addCase(confirmUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to confirm users.";
      });
  },
});

export const selectIsLoading = (state: RootState) => state.account.isLoading;
export const selectError = (state: RootState) => state.account.error;
export const selectToken = (state: RootState) => state.account.token;
export const selectEmail = (state: RootState) => state.account.email;
export const selectusername = (state: RootState) => state.account.username;

export const { updateToken } = accountSlice.actions;

export default accountSlice.reducer;