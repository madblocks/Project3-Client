import Signup from './Signup'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Header= (props) => {
    
const StyledWrapper = styled.div `
border: 1px solid black
`;
    return(
        <StyledWrapper>
        <div>
            <Link to='/signup'><button>Signup</button></Link>
            <Link to='/login'><button>Login</button></Link>
        </div>
        </StyledWrapper>
    )
}

export default Header