import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div>Navbar</div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/filter">Filtrar ações</Link>
      </div>
    </div>
  );
};

export default NavBar;
