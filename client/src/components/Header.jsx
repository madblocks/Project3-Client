import Signup from './Signup'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

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
    

    return(
        <StyledWrapper>
        <div className="header">
            <img src={require("../images/logo_transparent.png")} alt="logo" className="logo"></img>
            <Link to='/signup'><button>Signup</button></Link>
            <Link to='/login'><button>Login</button></Link>
        </div>
        </StyledWrapper>
    )
}

export default Header