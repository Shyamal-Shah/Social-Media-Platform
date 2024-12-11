import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import CommentsModel from "../components/CommentsModel";
import AddPostModel from "../components/AddPostModel";
import { useDispatch, useSelector } from "react-redux";
import { addComment, createPost, fetchPosts } from "../services/PostService";
import { addPost, setPosts, updatePost } from "../store/postSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        dispatch(setPosts(data?.posts || []));
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  const posts = useSelector((state) => state.postsReducer.posts || []);

  const [isCommentsModelOpen, setIsCommentsModelOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const [isAddPostModelOpen, setIsAddPostModelOpen] = useState(false);

  const saveNewPost = async ({ caption, image }) => {
    const data = await createPost(caption, image);
    dispatch(addPost(data.post));
    setIsAddPostModelOpen(false);
  };

  const handleCommentsModelOpen = (index) => {
    posts[index].comments && setComments(posts[index].comments);
    setIsCommentsModelOpen(true);
  };

  const handleAddComment = async (index, comment) => {
    const data = await addComment(posts[index]._id, comment);
    if (data) {
      dispatch(updatePost(data.post));
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1 lg:hidden sm:block">
              <div className="bg-white shadow p-4 mb-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setIsAddPostModelOpen(true)}
                >
                  Add Post
                </button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Post
                posts={posts}
                onCommentsClick={handleCommentsModelOpen}
                onAddCommentClick={handleAddComment}
              />
            </div>
            <div className="lg:col-span-1 hidden lg:block">
              <div className="bg-white shadow p-4 mb-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setIsAddPostModelOpen(true)}
                >
                  Add Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommentsModel
        isOpen={isCommentsModelOpen}
        onClose={() => {
          setIsCommentsModelOpen(false);
          setComments([]);
        }}
        comments={comments}
      />
      <AddPostModel
        isOpen={isAddPostModelOpen}
        onClose={() => {
          setIsAddPostModelOpen(false);
        }}
        onSave={saveNewPost}
      />
    </>
  );
};

export default Dashboard;
