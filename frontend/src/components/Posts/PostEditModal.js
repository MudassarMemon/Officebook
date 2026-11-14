import "./PostEditModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { deletePost } from "../../store/posts";
import { Modal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function PostEditModal({
  post,
  sessionUser,
  setShowEditModal,
  setEditPostId,
  editPostId,
}) {
  const [editPostAuthorId, setEditPostAuthorId] = useState("");
  const [modalY, setmodalY] = useState(0);
  const [showPostSettingsModal, setShowPostSettingsModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  let modalX;

  if (id) {
    modalX = "20.5%";
  } else {
    modalX = "32%";
  }

  const handleDelete = () => {
    dispatch(deletePost(editPostId));
  };

  const getElementCoordinates = async (postId) => {
    let coordinates = document
      .querySelector(`#edit-post-icon${postId}`)
      .getBoundingClientRect();
    setmodalY(coordinates.bottom);
  };

  return (
    <>
      {post.feedId === sessionUser.id || post.authorId === sessionUser.id ? (
        <div
          className="edit-post-icon"
          id={`edit-post-icon${post.id}`}
          onClick={(e) => {
            setEditPostId(post.id);
            setEditPostAuthorId(post.authorId);
            getElementCoordinates(post.id);
            setShowPostSettingsModal(true);
          }}
        >
          <FontAwesomeIcon className="meatball-menu" icon={faEllipsis} />
        </div>
      ) : (
        ""
      )}

      {showPostSettingsModal && (
        <Modal
          background={false}
          position={[modalY, modalX, null, null]}
          onClose={() => setShowPostSettingsModal(false)}
        >
          {editPostAuthorId === sessionUser.id ? (
            <div className="post-settings">
              <div
                className="edit-posts-container"
                onClick={() => {
                  setShowPostSettingsModal(false);
                  setShowEditModal(true);
                }}
              >
                <i className="fa-solid fa-pen edit-posts-icon"></i>
                <button>Edit Post</button>
              </div>

              <div
                className="delete-posts-container"
                onClick={() => {
                  handleDelete();
                  setShowPostSettingsModal(false);
                }}
              >
                <i className="fa-solid fa-trash delete-posts-icon"></i>
                <button>Delete Post</button>
              </div>
            </div>
          ) : (
            <div className="post-settings">
              <div
                className="delete-posts-container"
                onClick={() => {
                  handleDelete();
                  setShowPostSettingsModal(false);
                }}
              >
                <div className="delete-posts-icon"></div>
                <button>Delete Post</button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}

export default PostEditModal;
