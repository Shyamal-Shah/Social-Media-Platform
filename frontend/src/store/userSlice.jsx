import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      sessionStorage.setItem("token", action.payload.token);
      delete action.payload.token;
      state.user = action.payload.user;
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    clearUser: (state, action) => {
      state.user = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
