import "./PostLikes.css";
import { useDispatch } from "react-redux";
import { likePost } from "../../store/posts";

function PostLikes({ post, users, sessionUser }) {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likePost(post.id));
  };

  const focusCommentInput = () => {
    const inputElement = document.querySelector(
      `input#id${post.id}.comment-input`
    );
    if (inputElement) {
      inputElement.focus();
    }
  };
  if (!post) return null;
  return (
    <>
      <div className="post-likes">
        {post.likes.length > 0 ? (
          <img
            alt=""
            id="liked"
            src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E"
          ></img>
        ) : (
          ""
        )}
        {post.likes.length < 2
          ? post.likes
              .map((like) => {
                if (like.user_id === sessionUser.id) return "You";
                else {
                  return (
                    users[like.user_id - 1]?.firstName +
                    " " +
                    users[like.user_id - 1]?.lastName
                  );
                }
              })
              .join(" ")
          : ""}

        {post.likes.length === 2
          ? post.likes
              .map((like) => {
                if (like.user_id === sessionUser.id) return "You";
                else {
                  return (
                    users[like.user_id - 1]?.firstName +
                    " " +
                    users[like.user_id - 1]?.lastName
                  );
                }
              })
              .join(" and ")
          : ""}

        {post.likes.length === 3
          ? post.likes
              .slice(0, 2)
              .map((like) => {
                if (like.user_id === sessionUser.id) return "You";
                else {
                  return (
                    users[like.user_id - 1]?.firstName +
                    " " +
                    users[like.user_id - 1]?.lastName
                  );
                }
              })
              .join(", ") + ` and ${post.likes.length - 2} other`
          : ""}

        {post.likes.length > 3
          ? post.likes
              .slice(0, 2)
              .map((like) => {
                if (like.user_id === sessionUser.id) return "You";
                else {
                  return (
                    users[like.user_id - 1]?.firstName +
                    " " +
                    users[like.user_id - 1]?.lastName
                  );
                }
              })
              .join(", ") + ` and ${post.likes.length - 2} others`
          : ""}
      </div>
      <div className="likes-list">
        <ul>
          {post.likes.map((like) => {
            return (
              <li key={like.id}>
                {users[like.user_id - 1]?.firstName +
                  " " +
                  users[like.user_id - 1]?.lastName}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="like-bar-container">
        <div className="like-button">
          {" "}
          <button onClick={handleLike}>
            {post.likes.findIndex((like) => like.user_id === sessionUser.id) <
            0 ? (
              <i id="thumbs-up" className="fa-regular fa-thumbs-up"></i>
            ) : (
              <i
                id="thumbs-up"
                className="fa-solid fa-thumbs-up"
                style={{ color: "#0566ff" }}
              ></i>
            )}{" "}
            Like
          </button>
        </div>
        <div className="comment-button-focus" onClick={focusCommentInput}>
          <button>
            <i id="comment-icon" className="fa-regular fa-comment"></i>Comment
          </button>
        </div>
      </div>
    </>
  );
}

export default PostLikes;
