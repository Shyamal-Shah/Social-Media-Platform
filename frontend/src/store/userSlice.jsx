import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state, action) => {
      state.user = null;
    },
  },
});

export const { addPost, deletePost, updatePost } = userSlice.actions;
export default userSlice.reducer;
