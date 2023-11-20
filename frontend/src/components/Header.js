import { NavLink } from "react-router-dom";
import "../styles/header.css";
const Header = () => {
  return (
    <>
      <nav className="navbar back">
        <div className="container-fluid">
          <NavLink to={"/"}>
            <span className="navbar-brand mb-0 h1 text-white">
              DigiSolutions
            </span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Header;
