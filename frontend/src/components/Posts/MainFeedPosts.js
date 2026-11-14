import "./MainFeedPosts.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { formatDateTime, formatDateShort } from "../Util/DateUtil";
import { getPosts, fetchPosts } from "../../store/posts";
import { getUsers, fetchUsers } from "../../store/users";
import { Modal } from "../../context/Modal";
import PostForm from "./PostForm";
import CommentForm from "../Comments/CommentForm";
import PostComments from "../Comments/PostComments";
import PostEditModal from "./PostEditModal";
import PostLikes from "../Likes/PostLikes";

function MainFeedPosts() {
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector(getPosts);
  const users = useSelector(getUsers);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const sortedPosts = () => {
    let sorted = [...posts].sort((a, b) => {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    return sorted;
  };

  if (!posts || !users) return null;

  return (
    <div className="mainfeed-posts-container">
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
          What's on your mind?
        </button>

        {showCreateModal && (
          <Modal onClose={() => setShowCreateModal(false)}>
            <PostForm
              onClose={() => setShowCreateModal(false)}
              user={sessionUser}
            />
          </Modal>
        )}
      </div>

      <ul>
        {sortedPosts().map((post) => {
          return (
            <li key={post.id}>
              <PostEditModal
                post={post}
                sessionUser={sessionUser}
                setShowEditModal={setShowEditModal}
                setEditPostId={setEditPostId}
                editPostId={editPostId}
              />

              <div className="post-author">
                <div>
                  <Link to={`/users/${post.authorId}`}>
                    <img
                      id="userIcon"
                      alt="userLogo"
                      src={users && users[post.authorId - 1]?.avatarUrl}
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
                    {post.authorId !== post.feedId ? (
                      <>
                        <i className="fa-solid fa-caret-right arrow-icon"></i>
                        <Link to={`/users/${post.feedId}`}>
                          {users[post.feedId - 1]?.firstName}{" "}
                          {users[post.feedId - 1]?.lastName}
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
                users={users}
                postId={post.id}
                postAuthor={post.authorId}
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
                <CommentForm authorId={sessionUser.id} postId={post.id} />
              </div>
            </li>
          );
        })}
      </ul>

      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <PostForm
            onClose={() => setShowEditModal(false)}
            user={sessionUser}
            postId={editPostId}
          />
        </Modal>
      )}
    </div>
  );
}

export default MainFeedPosts;
