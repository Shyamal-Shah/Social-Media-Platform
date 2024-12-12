import React from "react";
import PropTypes from "prop-types";

const Post = ({ posts = [], onCommentsClick, onAddCommentClick }) => {
  return (
    <div className="mx-auto max-w-2xl gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none ">
      {posts.map((post, index) => {
        const handleAddComment = async () => {
          const comment = document.getElementById(`comment-${index}`).value;
          document.getElementById(`comment-${index}`).value = "";
          await onAddCommentClick(index, comment);
        };
        return (
          <article
            key={index}
            className="flex max-w-xl flex-col items-start justify-between border-b border-grey-200 pb-2 mb-8"
          >
            <div className="relative flex items-center gap-x-4">
              <div
                className="size-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900"
                aria-label={post.user.username}
              >
                <p className="font-semibold text-gray-900">
                  {post.user.username
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </p>
              </div>
              <div className="text-sm/6">
                <p className="font-semibold text-gray-900">
                  <a href="33">{post.user.username}</a>
                </p>
                <time dateTime={post.createdAt} className="text-gray-500">
                  {new Date(post.createdAt).toDateString()}
                </time>
              </div>
            </div>
            <div className="mt-2 border border-gray-500 w-2xl sm:px-6 lg:gap-x-8 lg:px-8">
              <img
                alt="Post Image"
                src={post.imageUrl}
                className="size-full object-cover"
              />
            </div>

            <div className="group relative">
              <p className="mt-5 text-sm/6 text-gray-600">
                <a href="#">
                  <span className="font-bold text-gray-900 pr-2">
                    {post.user.username}
                  </span>
                </a>
                {post.caption}
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              {post.comments?.length > 0 && (
                <button
                  type="button"
                  className="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600"
                  onClick={() => onCommentsClick(index)}
                >
                  View all {post.comments?.length} comments
                </button>
              )}
            </div>
            <div className="flex w-full items-center gap-x-4">
              <input
                className="w-full block min-w-0 grow py-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                type="text"
                id={`comment-${index}`}
                placeholder="Add a comment..."
              />
              <button
                type="button"
                onClick={handleAddComment}
                className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-900"
              >
                Post
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};
Post.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onCommentsClick: PropTypes.func.isRequired,
  onAddCommentClick: PropTypes.func.isRequired,
};

export default Post;
