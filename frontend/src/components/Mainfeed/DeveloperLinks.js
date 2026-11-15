import "./DeveloperLinks.css";

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
          <img alt="" id="mainfeed-git-logo" src="https://facespace-fs-seeds.s3.amazonaws.com/TheOfficeBookFavicon.png"/>Officebook Repo
      </a>
    </div>
  );
}

export default DeveloperLinks;
