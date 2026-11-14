import "./MainFeed.css";
import { useSelector } from "react-redux";
import MainFeedPosts from "../Posts/MainFeedPosts";
import MainFeedFriends from "../Friends/MainFeedFriends";
import DeveloperLinks from "./DeveloperLinks";
import { Link } from "react-router-dom";

function MainFeed() {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) return null;

  return (
    <div className="main-feed">
      <div className="main-feed-left"> <DeveloperLinks /></div>

      <MainFeedPosts />

      <div className="friends-section">
        <Link to={`/users/${sessionUser.id}/friends`}>
          <h2>
            <i className="fa-solid fa-user-group"></i> Friends
          </h2>
        </Link>
        <MainFeedFriends sessionUser={sessionUser} />
      </div>
    </div>
  );
}

export default MainFeed;
