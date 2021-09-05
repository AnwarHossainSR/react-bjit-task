import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const histry = useHistory();
  const user = JSON.parse(localStorage.getItem("user-info"));
  function logout() {
    localStorage.clear();
    histry.push("/login");
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="nav_bar_brand">
          <Link to="/">Home</Link>
        </Navbar.Brand>
        <Nav className="mr-auto nav_bar_wraper">
          {localStorage.getItem("user-info") ? (
            <>
              <Link to="/add">Add Product</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </Nav>
        <Nav>
          {localStorage.getItem("user-info") ? (
            <>
              <NavDropdown title={user.name}>
                <NavDropdown.Item>Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : null}
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;
