import './App.css';
import {Route, Routes} from 'react-router-dom'
import Landing from './components/Landing'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import Logout from './components/Logout'
import Profile from './components/Profile'
import { useState, useEffect } from 'react'
import { DataContext }from './DataContext'
import {CheckSession} from './services/Auth'


function App() {

const [user, setUser] = useState(null)
const [isLoggedIn, setLoggedIn] = useState(false)
const [authenticated, setAuth] = useState(false)

// const checkToken = async () =>{
//   const user = await CheckSession();
//   setUser(user)
//   setAuth(true)
// }
// useEffect(()=> {
//   const token = localStorage.getItem('token')
//   if (token) {
//     checkToken();
//   }
// },[])
  return (
    <DataContext.Provider 
    value ={{isLoggedIn, setLoggedIn,
            user, setUser,
            authenticated, setAuth}}>
    <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path ='/signup' element={<Signup/>}/>
          <Route path ='/login' element={<Login/>}/>
          <Route path ='/logout' element={<Logout/>}/>
          <Route path ='/profile' element={<Profile/>}/>
          <Route path = '/profile/:user_id' element={<Profile/>}/>

        </Routes>
      </main>
    </div>
    </DataContext.Provider>
  );
}

export default App;
