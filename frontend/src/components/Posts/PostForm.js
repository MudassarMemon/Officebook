import "./PostForm.css";
import { useState, useEffect, useRef } from "react";
import { createPost, getPost, updatePost, uploadPost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";

function PostForm({ onClose, user, postId }) {
  const sessionUser = useSelector((state) => state.session.user);
  const post = useSelector(getPost(postId));
  const [body, setBody] = useState(postId ? post.body : "");
  const [photoFile, setPhotoFile] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const postInput = useRef();
  const authorId = sessionUser.id;
  const feedId = user.id;

  useEffect(() => {
    postInput.current.focus();
  }, [postInput]);

  const handleRemovePhoto = (e) => {
    e.preventDefault();
    setPhotoFile(null);
    setPhotoURL(null);
  };

  const handleFile = (e) => {
    const file = e.currentTarget.files[0];
    setPhotoFile(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => setPhotoURL(fileReader.result);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body === "") {
      setError("Post cannot be blank.");
      return;
    }
    onClose();
    if (postId) {
      return dispatch(updatePost({ ...post, body }));
    } else {
      if (!photoURL) {
        return dispatch(createPost({ authorId, body, feedId }));
      } else {
        const newPost = new FormData();
        newPost.append("post[body]", body);
        newPost.append("post[authorId]", authorId);
        newPost.append("post[feedId]", feedId);
        newPost.append("post[photo]", photoFile);
        dispatch(uploadPost({ newPost }));
      }
    }
  };

  return (
    <div className="create-post-form">
      <i
        onClick={onClose}
        id="close-create-post"
        className="fa-solid fa-xmark close-icon"
        role="button"
        tabIndex={0}
        aria-label="Close"
      ></i>
      <form onSubmit={handleSubmit}>
        <h1>{postId ? "Edit post" : "Create post"}</h1>
        {error ? <p className="empty-body">{error}</p> : ""}
        <textarea
          ref={postInput}
          value={body}
          placeholder={
            user.id === sessionUser.id
              ? "What's on your mind?"
              : `Write something to ${user.firstName}...`
          }
          onChange={(e) => setBody(e.target.value)}
          id="create-post"
          name="create-post"
          rows="4"
          cols="50"
        />
        {!postId && (
          <div className="post-photo-container">
            {photoURL && (
              <>
                <img alt="" src={photoURL} id="preview" />
                <i
                  onClick={handleRemovePhoto}
                  id="remove-post-image"
                  className="fa-solid fa-xmark close-icon"
                  role="button"
                  tabIndex={0}
                  aria-label="Remove image"
                ></i>
              </>
            )}
            <div className="post-photo-button">
              Upload an Image <i className="fa-solid fa-image"></i>
              <input
                type="file"
                className="upload-image"
                onChange={(e) => handleFile(e)}
              />
            </div>
          </div>
        )}
        <input
          id="post-button"
          type="submit"
          value={postId ? "Save" : "Post"}
        />
      </form>
    </div>
  );
}

export default PostForm;
