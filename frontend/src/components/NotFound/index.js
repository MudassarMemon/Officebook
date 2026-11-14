import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or may have been moved.</p>
      <Link to="/">Go to News Feed</Link>
    </div>
  );
}

export default NotFound;
