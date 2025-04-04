import Authbar from "./authbar/Authbar";
import "./navbar.css";
import { Link } from "react-router-dom";
import Logo from "/images/logo.png";

function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="nav-main">
        <Link to="/adopt">Adopt</Link>
        <Link to="/rehome">Rehome</Link>
        <Link to="/community">Community</Link>
        <Link to="/care-guide">Care Guide</Link>
        <Link to="/about">About Us</Link>
      </div>
      <div className="nav-right">
        <Authbar />
      </div>
    </nav>
  );
}

export default Navbar;
