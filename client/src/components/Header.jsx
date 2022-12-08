import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { DataContext } from '../DataContext'
import { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const StyledWrapper = styled.div `
.header{
    display:flex;

}
.logo{
    height: 120px;
    width: 120px;
}

.navbar-collapse{
    display: flex;
     justify-content: flex-end;
}
.nav_link{
    background: #0e6655!important;
}
`;

function NavbarDarkExample() {
  return (
    <Navbar variant="dark" bg="dark" className='nav_link' expand="lg">
      <Container fluid>
        <Navbar.Brand href="/"><img src={require("../images/OutDoorsyLogoFinal2.svg")} alt="logo" className="logo"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="User"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">Update Email</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}





function FillExample({isAuthenticated}) {
  return isAuthenticated?(
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="profile" href="/profile">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="logout" href="/logout">Logout</Nav.Link>
      </Nav.Item>
    </Nav>
  ):(
    <Nav fill variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Nav.Link href="/">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="signup" href="/signup">Signup</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="login" href="/login">Login</Nav.Link>
    </Nav.Item>
  </Nav>
  )
}


const Header= (props) => {
    const {authenticated} = useContext(DataContext)


    return(
        <StyledWrapper>
            <NavbarDarkExample />
            {authenticated ? 
            <FillExample isAuthenticated={true}/>:<FillExample isAuthenticated={false}/>}
        </StyledWrapper>
    )
}

export default Header