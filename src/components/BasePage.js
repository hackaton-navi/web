import NavBar from "./Navbar";

const BasePage = ({ children, title }) => {
  return (
    <div className="p-4 row">
      <div className="col-1">
        <NavBar />
      </div>
      <div className="col-11">
        <h2>ESG Monitor - {title}</h2>
        <hr />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default BasePage;
