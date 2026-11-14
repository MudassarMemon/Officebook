import { formatDateShorter } from "../Util/DateUtil";
import { useSelector } from "react-redux";
import ProfileEditModal from "./ProfileEditModal";
import "./ProfileIntro.css";

function ProfileIntro({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  if (!user) return null;

  const editIntroModal = () => {
    if (user.id === sessionUser.id) {
      return <ProfileEditModal user={user} buttonName="Edit Intro" />;
    } else {
      return null;
    }
  };

  return (
    <div className="intro-container">
      <div className="profile-bio-container">
        <h2>Intro</h2>
        {user.bio ? user.bio : editIntroModal()}
      </div>
      <div className="profile-workplace-container">
        {user.workplace ? (
          <div>
            <i className="fa-solid fa-briefcase" aria-hidden="true"></i>
            {"Works at " + user.workplace}
          </div>
        ) : null}
      </div>

      <div className="profile-school-container">
        {user.school ? (
          <div>
            <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
            {"Studied at " + user.school}
          </div>
        ) : null}
      </div>

      <div className="profile-currentCity-container">
        {user.currentCity ? (
          <div>
            <i className="fa-solid fa-house" aria-hidden="true"></i>
            {"Lives in " + user.currentCity}
          </div>
        ) : null}
      </div>
      <div className="profile-hometown-container">
        {user.hometown ? (
          <div>
            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
            {"From " + user.hometown}
          </div>
        ) : null}
      </div>
      <div className="profile-pronunciation-container">
        {user.pronunciation ? (
          <div>
            <i className="fa-solid fa-volume-high" aria-hidden="true"></i>
            {"Pronounces name " + user.pronunciation}
          </div>
        ) : null}
      </div>
      <div className="profile-createdAt-container">
        {user ? (
          <div>
            <i className="fa-solid fa-clock" aria-hidden="true"></i>
            {"Joined " + formatDateShorter(user.createdAt)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProfileIntro;
