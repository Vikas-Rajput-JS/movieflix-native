import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "@/types/User";
const userSlice = createSlice({
  name: "user",
  initialState: { isLoggedin: false, data: {} },
  reducers: {
    loginUser: (state: any, action) => {
      state = { data: action.payload, isLoggedin: true };
      return state;
    },
    LogoutUser: (state: any, action) => {
      state = { data: {}, isLoggedin: false };
      return state;
    },
  },
});

export const { loginUser, LogoutUser } = userSlice.actions;

export default userSlice.reducer;
