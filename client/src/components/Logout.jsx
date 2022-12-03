import { DataContext } from '../DataContext'
import { useContext } from 'react'

const Logout = (props) =>{
    const {user, setUser} = useContext(DataContext)
    const {authenticated, setAuth} = useContext(DataContext)

    const logOut = () => {
        setUser(null)
        setAuth(false)
        localStorage.clear();
    }

    logOut();
    return(<div>Logged Out</div>)
}

export default Logout