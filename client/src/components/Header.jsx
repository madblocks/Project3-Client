import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { DataContext } from '../DataContext'
import { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { SfNav } from 'react-sf-building-blocks';
import svgLogo from '../images/OutDoorsyLogoFinal2.svg';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';


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
    background: #3dcfe0!important;
}
.nav_brand{
  display: none;
}
.nav_menu_0{
  display: none;
}
.nav_menu_1{
  display: none!important;
}
.nav_menu_2{
  display: none!important;
}
.sf_input{
  display: none!important;
}
.nav_signin_button{
  display: none!important;
}


`;

function NavbarDarkExample({isAuthenticated}) {
  return (
    <div>
    <Navbar variant="dark" bg="dark" className='nav_link' expand="lg">
      <Container fluid>
        <Navbar.Brand href="/"><img src={require("../images/OutDoorsyLogoFinal2.png")} alt="logo" className="logo"></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        {isAuthenticated?(
           <SfNav showProfile={true}
           profilePicture="https://flaticons.net/icon.php?slug_category=application&slug_icon=user-profile"
           profileMenu={[
             {caption: "Logout", link: 'logout'}
           ]}/>):null}
      </Container>
    </Navbar>
    </div>
  )
}







 function App() {
  return (
    <div className='fixed-bottom'>
    <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Footer text</h5>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
              Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam,
              est atque cumque eum delectus sint!
            </p>
          </MDBCol>

          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Footer text</h5>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
              Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam,
              est atque cumque eum delectus sint!
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: '#0e6655' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='#'>
          OutDoorsy.com
        </a>
      </div>
    </MDBFooter>
    </div>
  )
 }


function FillExample({isAuthenticated}) {
  return isAuthenticated?(
    <Nav fill variant="tabs" defaultActiveKey="/home">
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
            <NavbarDarkExample isAuthenticated={authenticated}/>
            {authenticated ? 
            <FillExample isAuthenticated={true}/>:<FillExample isAuthenticated={false}/>}
            <App />
        </StyledWrapper>
       
    )
}

export default Header