import styled from 'styled-components'
import { DataContext } from '../DataContext'
import { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { SfNav } from 'react-sf-building-blocks';
import { MDBFooter } from 'mdb-react-ui-kit';


const StyledWrapper = styled.div `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond&family=DM+Serif+Display&display=swap');

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
.navbar-toggler{
  display: none;
}
.btn_signin_portrait{
  display: none!important;
}
.nav_left_menu{
  display: none;
}
span{
  display: none;
}
.text-dark{
  text-decoration: none;
}
.nav_title{
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  color: #143e87;
  font-weight: bold;
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
            {caption: "Profile", link: 'profile'},
             {caption: "Logout", link: 'logout'}
           ]}/>):null}
      </Container>
    </Navbar>
    </div>
  )
}







 function App() {
  return (
    
    <div className='fixed-bottom footer'>
    <MDBFooter  className='text-center text-lg-left'>
      

      <div className='text-center p-3' style={{ backgroundColor: '#0e6655' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='/'>
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
        <Nav.Link className='nav_title' eventKey="profile" href="/profile">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className='nav_title' eventKey="logout" href="/logout">Logout</Nav.Link>
      </Nav.Item>
    </Nav>
  ):(
    <Nav fill variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Nav.Link className='nav_title' eventKey="signup" href="/signup">Signup</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link className='nav_title' eventKey="login" href="/login">Login</Nav.Link>
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