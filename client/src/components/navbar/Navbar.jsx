import { useContext } from "react";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Popover from "../popover/Popover";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    // navigate(`http://localhost:3001/${location.pathname}`);
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">
            <h2>vivuGo</h2>
          </span>
        </Link>
        {user && (
          <Popover
            renderPopover={
              <div onClick={handleLogout} className="renderPopover">
                Đăng xuất
              </div>
            }
          >
            {<div>{user.username}</div>}
          </Popover>
        )}

        {!user && (
          <div className="navItems">
            <Link to="/register" className="navButton">
              Register
            </Link>
            <Link to="/login" className="navButton">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
