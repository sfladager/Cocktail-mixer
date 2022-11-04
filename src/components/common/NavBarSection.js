
// Bootstrap components
import NavBar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

// React components
import { Link } from 'react-router-dom'


const NavBarSection = () => {

  return (
    <NavBar expand="sm">
      <Container>
        <NavBar.Brand as={Link} to="/">🍸</NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cocktails">Cocktails</Nav.Link>
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  )
}

export default NavBarSection