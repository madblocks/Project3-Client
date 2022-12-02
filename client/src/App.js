import './App.css';
import {Route, Routes} from 'react-router-dom'
import Landing from './components/Landing'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import Logout from './components/Logout'
import Profile from './components/Profile'
import { useState } from 'react'
import { DataContext }from './DataContext'

function App() {

const [user, setUser] = useState(null)
const [isLoggedIn, setLoggedIn] = useState(false)






  return (
    <DataContext.Provider 
    value ={{isLoggedIn, setLoggedIn,
            user, setUser}}>
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
