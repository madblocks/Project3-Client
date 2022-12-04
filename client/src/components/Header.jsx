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
    const {authenticated} = useContext(DataContext)


    return(
        <StyledWrapper>
        <div className="header">
            <Link to='/' ><img src={require("../images/logo_transparent.png")} alt="logo" className="logo"></img></Link>
            
            {authenticated ? 
            <div>
                <Link to='/profile'><button>profile</button></Link>
                <Link to='/logout'><button>Logout</button></Link>
            </div>
            : <div>
                <Link to='/signup'><button>Signup</button></Link>
                <Link to='/login'><button>Login</button></Link>
            </div>
            }
        </div>
        </StyledWrapper>
    )
}

export default Header