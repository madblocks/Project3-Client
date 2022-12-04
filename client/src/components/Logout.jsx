import { DataContext } from '../DataContext'
import { useEffect, useContext } from 'react'

const Logout = () =>{
    const {setUser, setAuth} = useContext(DataContext)

    useEffect(() => {
        setUser(null)
        setAuth(false)
        localStorage.clear();
    })

    return(<div>You have been logged out</div>)
}

export default Logout