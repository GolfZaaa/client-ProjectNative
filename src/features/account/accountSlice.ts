import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../api/store";
import agent from "../api/agent";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface address {
  province: string;
  district: string;
  subDistrict: string;
  postalCode:string;
}

interface AccountState {
  email: string;
  role: string;
  username: string;
  password: string;
  isLoading: boolean;
  token: string | null; 
  userid : string;
  anonymous:any;
  address:address[];
  newUserName: string;
  name : string;
  newEmail : string;
  newPassword : string;
  confirmPassword : string;
  profileImage : string;
}

const initialState: AccountState = {
  email: "",
  role: "Member",
  username: "",
  password: "",
  isLoading: false,
  token: null,
  userid : "",
  anonymous : null,
  address: [],
  newUserName: "",
  name : "",
  newEmail : "",
  newPassword : "",
  confirmPassword : "",
  profileImage : "",
};

export const  loginAsync = createAsyncThunk(
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
      console.log("response",response)
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

export const ReSendEmailToken = createAsyncThunk("Authentication/ResendConfirmEmail",
  async ({email}: {email: string}) => {
    try {
      const response = await agent.Account.resendEmail({email});
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const ResetForgotPasswordToken = createAsyncThunk("Authentication/ResendConfirmForgotPassword",
  async ({email}: {email: string}) => {
    try {
      const response = await agent.Account.ResetForgotPassword({email});
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const SendMessageToForgotPassword = createAsyncThunk("Authentication/SendMessageToForgotPassword",
  async ({email}: {email: string}) => {
    try {
      const response = await agent.Account.SendMessageToForgotPassword({email});
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const ConfirmOtpPassword = createAsyncThunk("Authentication/ConfirmEmailToForgotPassword",
  async ({email,confirmForgotPassowrd}: {email: string, confirmForgotPassowrd:string}) => {
    try {
      const response = await agent.Account.ConfirmOTPForgotPassword({email, confirmForgotPassowrd});
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const CreateNewPassword = createAsyncThunk("Authentication/ForgetPassword",
  async ({email,password,confirmPassword}: {email: string, password:string, confirmPassword:string}) => {
    try {
      const response = await agent.Account.CreateNewPassword({email, password, confirmPassword});
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const AddProfile = createAsyncThunk("Authentication/UploadProfileImage",
  async ({userId,ProfileImage}: {userId: string, ProfileImage:string}) => {
    try {
      const response = await agent.Account.AddProfile({userId, ProfileImage});
      return response;
    } catch (error) {
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
      AsyncStorage.getItem('username');
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
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
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
      AsyncStorage.removeItem('username');
      AsyncStorage.setItem('username', action.payload);
    },
    // เคยติด เพราะใช้ action.payload.username

    changeemail:(state,action) => {
      state.email = action.payload;
      AsyncStorage.removeItem('email');
      AsyncStorage.setItem('email', action.payload);
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload.username; 
        state.email = action.payload.email;
        state.token = action.payload.token; 
        state.userid = action.payload.userid;
        state.anonymous = action.payload.anonymous;
        state.password = action.payload.password;
        state.profileImage = action.payload.profileImage;

          AsyncStorage.setItem('anonymous', "true");

          AsyncStorage.setItem('token', action.payload.token);

          AsyncStorage.setItem('userId', action.payload.userid);

          AsyncStorage.setItem('username', action.payload.username);

          AsyncStorage.setItem('email', action.payload.email);



      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(confirmUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(confirmUserAsync.rejected, (state, action) => {
        state.isLoading = false;
      })



      .addCase(createaddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createaddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = action.payload;
      })
      .addCase(createaddress.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(GetAddressUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(GetAddressUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = action.payload;
      })
      .addCase(GetAddressUser.rejected, (state, action) => {
        state.isLoading = false;
      })



      .addCase(ChangeNameUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChangeNameUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload.username;
        state.newUserName = "";
      })
      .addCase(ChangeNameUser.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(ChangeEmailUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChangeEmailUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.email = action.payload.email;
        state.newEmail = "";
      })
      .addCase(ChangeEmailUser.rejected, (state, action) => {
        state.isLoading = false;
      })


      .addCase(ChangePasswordUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChangePasswordUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.password = action.payload.password;
      })
      .addCase(ChangePasswordUser.rejected, (state, action) => {
        state.isLoading = false;
      })


      .addCase(DeleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = null;
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(GetDetailUserById.pending, (state) => {
        state.isLoading = true;
      })
        // state.profileImage = action.payload.profileImage; การที่จะนำค่าเฉพาะ มานั้นต้องทำการ
        // console.log(resposne) ของตัวนั้นก่อน GetDetailUserById เพื่อดูว่าค่านั้นมีอะไรบ้าง
        // ถ้าทำการ state.profileImage = action.payload; คือการเอาค่าของ resposne ทั้งหมดมาใส่
        // ไว้ที่ profileImage แบบนี้มันก็ใช้ได้แต่ต้องทำการ . เพื่อหาข้อมูลนั้นต่อด้วย 
      .addCase(GetDetailUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileImage = action.payload.profileImage;
      })
      .addCase(GetDetailUserById.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(ReSendEmailToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ReSendEmailToken.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ReSendEmailToken.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(SendMessageToForgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SendMessageToForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(SendMessageToForgotPassword.rejected, (state, action) => {
        state.isLoading = false;
      })


      .addCase(ConfirmOtpPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ConfirmOtpPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ConfirmOtpPassword.rejected, (state, action) => {
        state.isLoading = false;
      })


      .addCase(ResetForgotPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ResetForgotPasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ResetForgotPasswordToken.rejected, (state, action) => {
        state.isLoading = false;
      })


      .addCase(CreateNewPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateNewPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(CreateNewPassword.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(AddProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddProfile.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(AddProfile.rejected, (state, action) => {
        state.isLoading = false;
      })

  },
});

export const selectIsLoading = (state: RootState) => state.account.isLoading;
export const selectToken = (state: RootState) => state.account.token;
export const selectEmail = (state: RootState) => state.account.email;
export const selectusername = (state: RootState) => state.account.username;
export const selectuserid = (state: RootState) => state.account.userid;
export const selectanonymous = (state: RootState) => state.account.anonymous;
export const selectstreet = (state: RootState) => state.account.address;
export const selectChangeUsername = (state: RootState) => state.account.newUserName;
export const selectPassword = (state: RootState) => state.account.password;
export const selectProfileImage = (state: RootState) => state.account.profileImage;


export const {updateProfileImage,changeemail,updatePassword,updateEmail,updateusername,changename,removeaddress,anonymousadd, test,updateToken,updateUserId,anonymousUser } = accountSlice.actions;

export default accountSlice.reducer;
