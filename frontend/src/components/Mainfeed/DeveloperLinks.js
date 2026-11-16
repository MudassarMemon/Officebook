import "./DeveloperLinks.css";
import officebookIcon from "../../assets/officebook-icon.svg";

function DeveloperLinks() {
  return (
    <div className="developer-links">
      <h2>
        <i className="fa-solid fa-link"></i>Developer Links
      </h2>
      <a
        href="https://www.linkedin.com/in/mudassarmemon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-linkedin"></i> LinkedIn
      </a>
      <br />
      <a
        href="https://github.com/MudassarMemon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-github"></i> GitHub
      </a>
      <br />
      <a href="https://github.com/MudassarMemon/Officebook" target="_blank" rel="noopener noreferrer">
          <img alt="" id="mainfeed-git-logo" src={officebookIcon}/>Officebook Repo
      </a>
    </div>
  );
}

export default DeveloperLinks;
