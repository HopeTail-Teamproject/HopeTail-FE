import { Outlet } from "react-router-dom";
import "./authLayout.css";

function AuthLayout() {
  return (
    <div className="layout-auth">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
