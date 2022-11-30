import './App.css';
import {Route, Routes} from 'react-router-dom'
import Landing from './components/Landing'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import Logout from './components/Logout'

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path ='/signup' element={<Signup/>}/>
          <Route path ='/login' element={<Login/>}/>
          <Route path ='/logout' element={<Logout/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
