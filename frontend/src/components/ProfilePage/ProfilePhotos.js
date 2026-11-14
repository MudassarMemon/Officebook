import "./ProfilePhotos.css";
import { useSelector } from "react-redux";
import { getPosts } from "../../store/posts";
import { useHistory } from "react-router-dom";

function ProfilePhotos() {
  const posts = useSelector(getPosts);
  const history = useHistory();

  if (!posts) return null;
  return (
    <>
      {posts.map((post) => {
        if (post.photoUrl) {
          return (
            <img
              key={post.id}
              className={
                history.location.pathname.includes("photos")
                  ? "profile-photos-tab"
                  : "profile-photos"
              }
              alt=""
              src={post.photoUrl}
            ></img>
          );
        }
        return null;
      })}
    </>
  );
}

export default ProfilePhotos;
