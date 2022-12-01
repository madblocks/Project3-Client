import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { DataContext } from '../DataContext'
import { useContext } from 'react'

const StyledWrapper = styled.div `
.header{
    display:flex;

}
.logo{
    height: 120px;
    width: 120px;
}
`;

const Header= (props) => {
    const {isLoggedIn, setLoggedIn} = useContext(DataContext)







    return(
        <StyledWrapper>
        <div className="header">
            <Link to='/' ><img src={require("../images/logo_transparent.png")} alt="logo" className="logo"></img></Link>
            <Link to='/signup'><button>Signup</button></Link>
            <Link to='/login'><button>Login</button></Link>
            
            
        </div>
        </StyledWrapper>
    )
}

export default Header