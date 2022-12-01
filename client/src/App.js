import './App.css';
import {Route, Routes} from 'react-router-dom'
import Landing from './components/Landing'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import Logout from './components/Logout'
import { useState } from 'react'
import { DataContext }from './DataContext' 
import Profile from './components/Profile';

function App() {

const [isLoggedIn, setLoggedIn] = useState(false)






  return (
    <DataContext.Provider value ={{isLoggedIn, setLoggedIn}}>
    <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path ='/signup' element={<Signup/>}/>
          <Route path ='/login' element={<Login/>}/>
          <Route path ='/logout' element={<Logout/>}/>
          <Route path ='/profile' element={<Profile/>}/>
        </Routes>
      </main>
    </div>
    </DataContext.Provider>
  );
}

export default App;
