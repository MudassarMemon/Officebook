import "./CommentEditForm.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateComment } from "../../store/comments";

function CommentEditForm({ onClose, commentId, commentBody }) {
  const [body, setBody] = useState(commentBody ?? "");
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.stopPropagation();
    dispatch(updateComment({ body, id: commentId }));
    onClose();
  };

  return (
    <div className="edit-comment-form">
      <h1>Edit Comment</h1>
      <i
        onClick={onClose}
        id="close-edit-comment"
        className="fa-solid fa-xmark close-icon"
        role="button"
        tabIndex={0}
        aria-label="Close"
      ></i>
      <div className="comment-input">
        <textarea
          className="comment-input"
          type="text"
          placeholder="Write a comment..."
          value={body ?? ""}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          onClick={(e) => handleUpdate(e)}
          className="update-comment-button"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CommentEditForm;
