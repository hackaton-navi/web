import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";

const Link = ({ to, children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <NavLink
        className={styles.link}
        activeClassName={styles.linkActive}
        to={to}
        exact
      >
        {children}
      </NavLink>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="mt-2">
      <Link to="/">
        <i className="fa fa-home"></i>
      </Link>
      <Link to="/filter">
        <i className="fa fa-search"></i>
      </Link>
    </div>
  );
};

export default NavBar;
