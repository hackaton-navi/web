import NavBar from "./Navbar";

const BasePage = ({ children, title }) => {
  return (
    <div className="p-4 d-flex flex-row">
      <div style={{ marginRight: 50 }}>
        <NavBar />
      </div>
      <div className="flex-grow-1">
        <h2>ESG Monitor - {title}</h2>
        <hr />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default BasePage;
