import { Link } from "react-router-dom";
import "./authbar.css";

function Authbar() {
  return (
    <section className="authbar">
      <Link to="/login" className="login-btn">
        Log in
      </Link>
      <Link to="/signup" className="signup-btn">
        Sign up
      </Link>
    </section>
  );
}

export default Authbar;
