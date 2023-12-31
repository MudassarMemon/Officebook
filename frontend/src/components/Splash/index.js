import React from "react";
import LoginForm from "../LoginForm";
import SignupFormModal from "../SignupForm/index";
import "./Splash.css";

function Splash() {
  return (
    <>
      <div className="splashContainer">
        <div className="splashContentContainer">
          <div className="left">
            <div className="logoContainer">
              <img
                id="fb-logo"
                src="https://facespace-fs-seeds.s3.amazonaws.com/TheOfficeBookLogo.png"
                alt="fblogo"
              />
            </div>
            <h2>
              Connect with friends and the world around you on Officebook.
            </h2>
          </div>

          <div className="right">
            <LoginForm />
            <SignupFormModal />
          </div>
        </div>
      </div>
      <footer>
        <h4><a href="https://mudassarmemon.github.io/MudassarMemon/" target="_blank">Mudassar Memon</a></h4>
        <a
          href="https://www.linkedin.com/in/mudassar-memon-0a48b1125/"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin"></i> LinkedIn
        </a>
        <a href="https://github.com/MudassarMemon" target="_blank">
          <i className="fa-brands fa-github"></i> GitHub
        </a>
        <a href="https://github.com/MudassarMemon/Facespace" target="_blank">
          <img alt="" id="officebook-git-logo" src="https://facespace-fs-seeds.s3.amazonaws.com/TheOfficeBookFavicon.png"/>Officebook Repo
        </a>
      </footer>
    </>
  );
}

export default Splash;
