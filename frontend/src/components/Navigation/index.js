// styling and icon imports
import "./Navigation.css";
import officebookIcon from "../../assets/officebook-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
// functional imports
import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useParams, useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { getUsers } from "../../store/users";
import * as sessionActions from "../../store/session";
import NavBarDropdown from "./NavBarDropdown";
import NavSearch from "./NavSearch";
import Avatar from "../Avatar";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector(getUsers);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {}, [history.location.pathname, sessionUser]);

  function logout() {
    history.push("/");
    return dispatch(sessionActions.logout());
  }

  return (
    <div className="navBarContainer">
      <div className="leftNavBarContainer">
        <nav>
          <NavLink to="/">
            <img
              id="fbLogo"
              alt="fbLogo"
              src={officebookIcon}
            ></img>
          </NavLink>
          <NavSearch />
        </nav>
      </div>

      <div className="centerNavBarContainer">
        <Link id={id} className="centerNavBarContent" to="/">
          {history.location.pathname.length > 1 ? (
            <>
              <FontAwesomeIcon
                id="inactive-homepage-icon"
                className="fa-solid fa-house fa-2xl"
                icon={faHouse}
              />
            </>
          ) : (
            <FontAwesomeIcon
              id="homepage-icon"
              icon={faHouse}
              style={{ color: "#1b74e4" }}
            />
          )}
        </Link>
        {history.location.pathname.length > 1 ? null : (
          <div id="underline"></div>
        )}
      </div>

      <div className="rightNavBarContainer">
        <nav>
          <Avatar
            id="userLogo"
            alt="userLogo"
            src={users ? users[sessionUser?.id - 1]?.avatarUrl : sessionUser?.avatarUrl}
            onClick={() => {
              setShowModal((prev) => !prev);
            }}
          />
          {showModal && (
            <Modal
              position={[48, 10, null, null]}
              background={false}
              onClose={() => setShowModal(false)}
            >
              <NavBarDropdown
                sessionUser={sessionUser}
                logout={logout}
                onClose={() => setShowModal(false)}
              />
            </Modal>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navigation;
