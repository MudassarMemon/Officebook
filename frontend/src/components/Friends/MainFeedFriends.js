import "./MainFeedFriends.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, fetchUsers } from "../../store/users";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FriendRequestModal from "./FriendRequestModal";
import Avatar from "../Avatar";

function MainFeedFriends({ sessionUser }) {
  const { id } = useParams();
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  const user = users[sessionUser.id - 1];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, id]);

  if (!users || !user) return null;
  return (
    <div className="mainfeed-friends-component-container">
      <FriendRequestModal user={user} users={users} />
      <ul className="mainfeed-friends">
        {users[user.id - 1]?.friendRequests?.map((request) => {
          if (request.status) {
            return (
              <div className="mainfeed-friend" key={request.id}>
                <li>
                  <Link to={`/users/${request.userId}`}>
                    <Avatar alt="" src={users[request.userId - 1]?.avatarUrl} />
                    <h5>
                      {users[request.userId - 1]?.firstName}{" "}
                      {users[request.userId - 1]?.lastName}
                    </h5>
                  </Link>
                </li>
              </div>
            );
          } else {
            return null;
          }
        })}
        {users[user.id - 1]?.friends?.map((request) => {
          if (request.status) {
            return (
              <div className="mainfeed-friend" key={request.id}>
                <li>
                  <Link to={`/users/${request.friendId}`}>
                    <Avatar alt="" src={users[request.friendId - 1]?.avatarUrl} />
                    <h5>
                      {users[request.friendId - 1]?.firstName}{" "}
                      {users[request.friendId - 1]?.lastName}
                    </h5>
                  </Link>
                </li>
              </div>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
}

export default MainFeedFriends;
