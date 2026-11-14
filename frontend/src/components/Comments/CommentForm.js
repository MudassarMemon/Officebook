import "./CommentForm.css";
import { useState } from "react";
import { createComment } from "../../store/comments";
import { useDispatch } from "react-redux";

function CommentForm({ authorId, postId }) {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body === "") return;
    dispatch(createComment({ body, authorId, postId }));
    setBody("");
  };

  return (
    <div className="comment-input">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="comment-input"
          type="text"
          id={`id${postId}`}
          placeholder="Write a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <i
          onClick={handleSubmit}
          id="submit-message"
          className="fa-solid fa-paper-plane"
        ></i>
      </form>
    </div>
  );
}

export default CommentForm;
