import React, { useState } from "react";
import Post from "../components/Post";
import CommentsModel from "../components/CommentsModel";
import AddPostModel from "../components/AddPostModel";

const posts = [
  {
    _id: "67573e17624af3d7594e7110",
    user: {
      _id: "675550ae03de5c7c5212ee4b",
      username: "shyamal1",
      email: "email@mail.com",
    },
    caption: "My Watch",
    imageUrl:
      "https://social-media-platform-bucket.s3.ap-south-1.amazonaws.com/e732fa41-bd46-4936-8840-26681a27ec95-Screenshot 2024-12-08 000924.png",
    isActive: true,
    comments: [
      {
        id: "ab2bf2cc-8d8f-4ef8-a489-f519965de632",
        user: {
          _id: "675550ae03de5c7c5212ee4b",
          username: "shyamal1",
        },
        comment: "Nice watch",
        isActive: true,
        _id: "67573e57624af3d7594e7114",
        createdAt: "2024-12-09T19:00:39.839Z",
      },
      {
        id: "4e97f1c3-b72e-4287-826e-ccf883251b36",
        user: {
          _id: "675550ae03de5c7c5212ee4b",
          username: "shyamal1",
        },
        comment: "Nice watch ",
        isActive: true,
        _id: "67573e686173d8c98f0a4bd1",
        createdAt: "2024-12-09T19:00:56.088Z",
      },
    ],
    createdAt: "2024-12-09T18:59:35.235Z",
    updatedAt: "2024-12-09T19:00:56.115Z",
    __v: 2,
  },
  {
    _id: "67573e17q624af3d7594e7110",
    user: {
      _id: "675550ae03de5c7c5212ee4b",
      username: "shyamal1",
      email: "email@mail.com",
    },
    caption: "My Watch",
    imageUrl:
      "https://social-media-platform-bucket.s3.ap-south-1.amazonaws.com/e732fa41-bd46-4936-8840-26681a27ec95-Screenshot 2024-12-08 000924.png",
    isActive: true,
    comments: [
      {
        id: "ab2bf2cc-8d8f-4ef8-a489-f519965de632",
        user: {
          _id: "675550ae03de5c7c5212ee4b",
          username: "shyamal1",
        },
        comment: "Nice watch",
        isActive: true,
        _id: "67573e57624af3d7594e7114",
        createdAt: "2024-12-09T19:00:39.839Z",
      },
      {
        id: "4e97f1c3-b72e-4287-826e-ccf883251b36",
        user: {
          _id: "675550ae03de5c7c5212ee4b",
          username: "shyamal1",
        },
        comment: "Nice watch ",
        isActive: true,
        _id: "67573e686173d8c98f0a4bd1",
        createdAt: "2024-12-09T19:00:56.088Z",
      },
    ],
    createdAt: "2024-12-09T18:59:35.235Z",
    updatedAt: "2024-12-09T19:00:56.115Z",
    __v: 2,
  },
];
const Dashboard = () => {
  const [isCommentsModelOpen, setIsCommentsModelOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const [isAddPostModelOpen, setIsAddPostModelOpen] = useState(false);

  const saveNewPost = (data) => {
    console.log("Save new post");
    console.log(data);
    setIsAddPostModelOpen(false);
  };

  const handleCommentsModelOpen = (index) => {
    posts[index].comments && setComments(posts[index].comments);
    setIsCommentsModelOpen(true);
  };

  const handleAddComment = (index, comment) => {
    console.log("Add Comment");
    console.log(index, comment);
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
                onCommentClick={handleCommentsModelOpen}
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
