import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../api/store";
import agent from "../../api/agent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

interface address {
  province: string;
  district: string;
  subdistrict: string;
  postalcode:string;
}

interface AccountState {
  email: string;
  role: string;
  username: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  token: string | null; 
  userid : string;
  anonymous:any;
  address:address[];
  newUserName: string;
  name : string;
  newEmail : string;
  newPassword : string;
}

const initialState: AccountState = {
  email: "",
  role: "Member",
  username: "",
  password: "",
  isLoading: false,
  error: null,
  token: null,
  userid : "",
  anonymous : null,
  address: [],
  newUserName: "",
  name : "",
  newEmail : "",
  newPassword : "",
};

export const loginAsync = createAsyncThunk(
  "Authentication/Login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await agent.Account.login({ username, password });
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
    return response;
  }
);

export const confirmUserAsync = createAsyncThunk(
  "Authentication/ConfirmEmail",
  async ({ email, emailConfirmationToken }: { email: string; emailConfirmationToken: string }) => {
    try {
      const response = await agent.Account.confirm({ email, emailConfirmationToken });
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const createaddress = createAsyncThunk(
  "Authentication/CreateAddress",
  async ({ province, district,subdistrict,postalCode,userId }: { province: string; district: string,subdistrict:string,postalCode:string,userId:string }) => {
    try {
      const response = await agent.Account.createaddress({ province, district,subdistrict,postalCode,userId });
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const GetAddressUser = createAsyncThunk(
  "Authentication/PostUserAddress",
  async ({userId,}: {userId: string;}) => {
    try {
      const response = await agent.Account.getaddress({
        userId,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const GetDetailUserById = createAsyncThunk(
  "Authentication/GetSingleUser",
  async ({username,}: {username: string;}) => {
    try {
      const response = await agent.Account.getSingleUser({username,});
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const ChangeNameUser = createAsyncThunk("Authentication/ChangeUserName",
  async ({userId,username,newUserName
  }: {userId: string,username: string,newUserName:string;}) => {
    try {
      const response = await agent.Account.changeusername({
        userId,username,newUserName
      });

      AsyncStorage.removeItem('username');
      AsyncStorage.setItem("username" , newUserName); 
      ////อันนี้ควรจำ
      return response;
    } catch (error) {
      throw error;
    }
  }
);


export const ChangeEmailUser = createAsyncThunk(
  "Authentication/ChangeEmail",
  async ({ userId, email, newEmail }: { userId: string; email: string; newEmail: string }) => {
    try {
      const response = await agent.Account.changeemail({
        userId,
        email,
        newEmail,
      });
      console.log("💖",response.email);
      AsyncStorage.removeItem("email");
      AsyncStorage.setItem("email", newEmail);
      ////อันนี้ควรจำ
      return response;
    } catch (error) {
      // Alert.alert("Error", "An error occurred while changing email.");
      console.log(error)
      throw error;
    }
  }
);

export const ChangePasswordUser = createAsyncThunk(
  "Authentication/ChangePassword",
  async ({ userId, newPassword }: { userId: string;newPassword: string }, { dispatch }) => {
    try {
      const response = await agent.Account.changepassword({
        userId,
        newPassword,
      });
      // dispatch(updatePassword(newPassword)); // ตั้งค่า password ใหม่ใน Redux state
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);


export const DeleteUser = createAsyncThunk(
  "Authentication/Delete",
  async ({ userId}: { userId: string;}) => {
    try {
      const response = await agent.Account.deleteUser({
        userId,
      });
      AsyncStorage.removeItem("email");
      AsyncStorage.removeItem("username");
      AsyncStorage.removeItem("userId");
      AsyncStorage.removeItem("token");
      ////อันนี้ควรจำ
      return response;
    } catch (error) {
      console.log(error)
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
    updateusername: (state, action) => {
      state.username = action.payload;
      // AsyncStorage.removeItem('username');
    },
    updateUserId: (state, action) => {
      state.userid = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
      // AsyncStorage.removeItem('email');
    },
    anonymousUser: (state,action) => {
      state.anonymous = action.payload;
      AsyncStorage.removeItem('userid');
      AsyncStorage.removeItem('anonymous');
    },
    anonymousadd: (state) => {
      state.anonymous = true;
      AsyncStorage.setItem("anonymous", "true"); 
    },
    test :(state, action) => {
      console.log("payload", action.payload);
    },
    removeaddress :(state, action) => {
      state.address = [];
    },
    changename:(state,action) => {
      state.username = action.payload;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload.username; 
        state.email = action.payload.email;
        state.token = action.payload.token; 
        state.userid = action.payload.userid;
        state.anonymous = action.payload.anonymous;
        state.password = action.payload.password;

          AsyncStorage.setItem('anonymous', "true");

          AsyncStorage.setItem('token', action.payload.token);

          AsyncStorage.setItem('userId', action.payload.userid);

          AsyncStorage.setItem('username', action.payload.username);

          AsyncStorage.setItem('email', action.payload.email);

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
      })
      .addCase(confirmUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to confirm users.";
      })



      .addCase(createaddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createaddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = action.payload;
      })
      .addCase(createaddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to confirm users.";
      })

      .addCase(GetAddressUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(GetAddressUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = action.payload;
      })
      .addCase(GetAddressUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to confirm users.";
      })



      .addCase(ChangeNameUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ChangeNameUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload.username;
        state.newUserName = "";
      })
      .addCase(ChangeNameUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to Change name users.";
      })

      .addCase(ChangeEmailUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ChangeEmailUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.newEmail = "";
      })
      .addCase(ChangeEmailUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to Change Email users.";
      })


      .addCase(ChangePasswordUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ChangePasswordUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.password = action.payload.password;
      })
      .addCase(ChangePasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to Change Password users.";
      })


      .addCase(DeleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = null;
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to Change Password users.";
      })

      .addCase(GetDetailUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(GetDetailUserById.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(GetDetailUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to confirm users.";
      })


  },
});

export const selectIsLoading = (state: RootState) => state.account.isLoading;
export const selectError = (state: RootState) => state.account.error;
export const selectToken = (state: RootState) => state.account.token;
export const selectEmail = (state: RootState) => state.account.email;
export const selectusername = (state: RootState) => state.account.username;
export const selectuserid = (state: RootState) => state.account.userid;
export const selectanonymous = (state: RootState) => state.account.anonymous;
export const selectstreet = (state: RootState) => state.account.address;
export const selectChangeUsername = (state: RootState) => state.account.newUserName;
export const selectPassword = (state: RootState) => state.account.password;


export const {updatePassword,updateEmail,updateusername,changename,removeaddress,anonymousadd, test,updateToken,updateUserId,anonymousUser } = accountSlice.actions;

export default accountSlice.reducer;
