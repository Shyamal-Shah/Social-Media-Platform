import api from "./api";
import { toast } from "react-toastify";

const fetchPosts = async () => {
  try {
    const response = await api.get("/posts");
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

const createPost = async (caption, image) => {
  try {
    var formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    const response = await api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const { data } = response;
    toast.success("Post created successfully");
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

const addComment = async (postId, comment) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, { comment });
    const { data } = response;
    toast.success("Comment added successfully");
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

export { fetchPosts, createPost, addComment };
