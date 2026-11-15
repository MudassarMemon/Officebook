import { NavLink, Link } from "react-router-dom";
import "./ProfileHeader.css";
import { useSelector, useDispatch } from "react-redux";
import ProfileEditModal from "./ProfileEditModal";
import FriendModal from "../Friends/FriendModal";
import { uploadPhoto } from "../../store/users";
import Avatar, { BLANK } from "../Avatar";

function ProfileHeader({ id, user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const friendCount =
    (user?.friends?.filter((item) => item.status === true).length || 0) +
    (user?.friendRequests?.filter((item) => item.status === true).length || 0);
  const dispatch = useDispatch();

  function handleUpload(e) {
    const newPhoto = new FormData();
    newPhoto.append(`user[${e.target.id}]`, e.target.files[0]);
    dispatch(uploadPhoto({ id: sessionUser.id, photo: newPhoto }));
    window.location.reload();
  }

  return (
    <header className="profile-header">
      <div className="cover-photo-container">
        <img alt="cover" src={(user && user.coverUrl) || BLANK} />
        {user && sessionUser && user.id === sessionUser.id ? (
          <div className="upload-cover-photo">
            <form className="cover-form">
              <input type="file" id="cover" onChange={(e) => handleUpload(e)} />
            </form>
            <i className="fa-solid fa-camera cover-photo-icon"></i>
            Upload Cover Photo
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="profile-details-container">
        <div className="left-profile-details">
          <div className="profile-photo-container">
            <Avatar alt="userLogo" src={user && user.avatarUrl} />
            {user && sessionUser && user.id === sessionUser.id ? (
              <div>
                <div className="profile-photo-icon">
                  <i className="fa-solid fa-camera"></i>
                  <form className="upload-form">
                    <input
                      type="file"
                      id="avatar"
                      onChange={(e) => handleUpload(e)}
                    />
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profile-name-container">
            <h1>{user && user.firstName + " " + user.lastName}</h1>
            <Link id="friend-count" to={`/users/${id}/friends`}>
              {friendCount} friends
            </Link>
          </div>
        </div>
        <div className="right-profile-details">
          {user && user.id === sessionUser.id ? (
            <ProfileEditModal user={user} />
          ) : (
            <FriendModal user={user} />
          )}
        </div>
      </div>
      <div className="profile-links">
        <NavLink
          activeClassName="active-profile-link"
          exact
          to={`/users/${id}`}
        >
          Posts
        </NavLink>
        <NavLink
          activeClassName="active-profile-link"
          to={`/users/${id}/about`}
        >
          About
        </NavLink>
        <NavLink
          activeClassName="active-profile-link"
          to={`/users/${id}/friends`}
        >
          Friends
        </NavLink>
        <NavLink
          activeClassName="active-profile-link"
          to={`/users/${id}/photos`}
        >
          Photos
        </NavLink>
      </div>
    </header>
  );
}

export default ProfileHeader;
