import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[index] = action.payload;
    },
  },
});

export const { addPost, deletePost, updatePost } = postSlice.actions;
export default postSlice.reducer;
