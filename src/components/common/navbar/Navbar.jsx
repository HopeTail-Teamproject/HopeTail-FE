import Authbar from "./authbar/Authbar";
import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <Link to="/" className="logo">
          HopeTail
        </Link>
        <Link to="/adopt">Adopt</Link>
        <Link to="/rehome">Rehome</Link>
        <Link to="/community">Community</Link>
        <Link to="/care-guide">Care Guide</Link>
        <Link to="/about-us">About Us</Link>
      </div>
      <div className="nav-right">
        <Authbar />
      </div>
    </nav>
  );
}

export default Navbar;
