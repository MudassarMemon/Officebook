import "./ProfilePosts.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDateTime, formatDateShort } from "../Util/DateUtil";
import { Modal } from "../../context/Modal";
import { getPosts } from "../../store/posts";
import { getUsers } from "../../store/users";
import PostForm from "./PostForm";
import CommentForm from "../Comments/CommentForm";
import PostComments from "../Comments/PostComments";
import ProfilePostEditModal from "./ProfilePostEditModal";
import PostLikes from "../Likes/PostLikes";

function ProfilePosts({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const posts = useSelector(getPosts);
  const users = useSelector(getUsers);

  useEffect(() => {}, [user]);

  const sortedPosts = () => {
    let sorted = [...posts].sort((a, b) => {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    return sorted;
  };

  if (!user || !posts) return null;

  return (
    <div className="profile-posts-container">
      <div className="create-profile-post">
        <Link to={`/users/${sessionUser?.id}`}>
          <img
            id="userIcon"
            alt="userLogo"
            src={users[sessionUser.id - 1]?.avatarUrl}
          ></img>
        </Link>

        <button
          onClick={() => {
            setShowCreateModal(true);
          }}
        >
          {user && sessionUser && user.id === sessionUser.id
            ? "What's on your mind?"
            : `Write something to ${user.firstName}...`}
        </button>

        {showCreateModal && (
          <Modal onClose={() => setShowCreateModal(false)}>
            <PostForm onClose={() => setShowCreateModal(false)} user={user} />
          </Modal>
        )}
      </div>

      <ul>
        {sortedPosts().map((post) => (
          <li key={post.id}>
            <ProfilePostEditModal
              post={post}
              sessionUser={sessionUser}
              setShowEditModal={setShowEditModal}
              setEditPostId={setEditPostId}
              editPostId={editPostId}
            />

            <div className="post-author">
              <div className="userIcon">
                <Link to={`/users/${post.authorId}`}>
                  <img
                    id="userIcon"
                    alt="userLogo"
                    src={users[post.authorId - 1]?.avatarUrl}
                  ></img>
                </Link>
              </div>
              <div className="post-author-name">
                <div>
                  <Link to={`/users/${post.authorId}`}>
                    {users ? (
                      <>
                        {users[post.authorId - 1]?.firstName}{" "}
                        {users[post.authorId - 1]?.lastName}
                      </>
                    ) : (
                      ""
                    )}
                  </Link>
                  {post.authorId !== user.id ? (
                    <>
                      <i className="fa-solid fa-caret-right arrow-icon"></i>
                      <Link to={`/users/${user.id}`}>
                        {user.firstName} {user.lastName}
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <p className="created-at">
                    {formatDateShort(post.createdAt)}
                  </p>
                  <p className="last-updated">
                    {post.createdAt === post.updatedAt
                      ? formatDateTime(post.createdAt)
                      : "Edited on " + formatDateTime(post.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
            <div className="post-body">{post.body}</div>
            {post.photoUrl ? (
              <img className="post-image" alt="Post attachment" src={post.photoUrl}></img>
            ) : (
              ""
            )}
            <PostLikes post={post} sessionUser={sessionUser} users={users} />
            <PostComments
              sessionUser={sessionUser}
              postId={post.id}
              postAuthor={post.authorId}
              users={users}
            />
            <div className="add-comment">
              <div>
                <Link to={`/users/${sessionUser?.id}`}>
                  <img
                    id="userIcon"
                    alt="userLogo"
                    src={users[sessionUser.id - 1]?.avatarUrl}
                  ></img>
                </Link>
              </div>
              <CommentForm
                post={post}
                authorId={sessionUser.id}
                postId={post.id}
              />
            </div>
          </li>
        ))}
      </ul>

      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <PostForm
            onClose={() => setShowEditModal(false)}
            user={user}
            postId={editPostId}
          />
        </Modal>
      )}
    </div>
  );
}

export default ProfilePosts;
