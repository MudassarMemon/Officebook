import "./ProfileFriends.css";
import { useSelector } from "react-redux";
import { getUsers } from "../../store/users";
import { Link, useHistory } from "react-router-dom";
import FriendRequestModal from "./FriendRequestModal";
import Avatar from "../Avatar";

function ProfileFriends({ user }) {
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector(getUsers);
  const history = useHistory();

  if (!users || !user) return null;
  return (
    <div
      className={
        history.location.pathname.includes("friends")
          ? "friends-component-container-full-width"
          : "friends-component-container"
      }
    >
      {sessionUser?.id === user?.id ? (
        <FriendRequestModal user={user} users={users} />
      ) : null}
      <ul className="friends">
        {user.friendRequests?.map((request) => {
          if (request.status) {
            return (
                <li className="friend" key={request.id}>
                  <Link to={`/users/${request.userId}`}>
                    <Avatar alt="" src={users[request.userId - 1]?.avatarUrl} />
                    <h5>
                      {users[request.userId - 1]?.firstName}{" "}
                      {users[request.userId - 1]?.lastName}
                    </h5>
                  </Link>
                </li>

            );
          } else {
            return null;
          }
        })}
        {user.friends?.map((request) => {
          if (request.status) {
            return (
                <li className="friend" key={request.id}>
                  <Link to={`/users/${request.friendId}`}>
                    <Avatar alt="" src={users[request.friendId - 1]?.avatarUrl} />
                    <h5>
                      {users[request.friendId - 1]?.firstName}{" "}
                      {users[request.friendId - 1]?.lastName}
                    </h5>
                  </Link>
                </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
}

export default ProfileFriends;
