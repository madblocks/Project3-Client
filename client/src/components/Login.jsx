import { DataContext } from '../DataContext';
import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import { LoginUser } from '../services/Auth';

const StyledLogin = styled.div `


  width: 400px;
  height: 400px;
  padding-top: 20px;
  background: rgb(16,45,40);
background: linear-gradient(180deg, rgba(16,45,40,1) 0%, rgba(13,120,99,0.9893333333333333) 29%, rgba(234,238,238,0.696) 96%);
  margin: auto;
  border-radius: 10px;
  margin-top: 60px;
  color: white;

  .mb-3 {
      height: 60px; 
      
  }
  .input {
      width: 80%;
      height: 30px;
      border-radius: 10px;
      margin-left: 40px;
      background: rgba(255,255,255,.2);
      border: none;
  }
  .btn {
      width: 80%;
      height: 35px;
      border-radius: 10px;
      margin-top: 30px;
      background: #0d7863;
      border: none;
  }
  .label{
      margin-left: -230px;
  }

`;
//need feedback if username/password is incorrect
const Login = (props) =>{

    let navigate = useNavigate()
    const {setUser, setAuth} = useContext(DataContext)
    const {isLoggedIn, setLoggedIn} = useContext(DataContext)
    const [formData, setFormData] = useState({username: '', password: ''})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const payload = await LoginUser(formData)
        // sessionStorage.setItem('name', formData.username) 
        setFormData({username: '', password: ''})
        setUser(payload)
        setAuth(true)
        setLoggedIn(true)
        navigate('/profile')
    }

    return (
        <StyledLogin>
            <h1>Login</h1>
            <Form>
                <Form.Group className='mb-3' controlId='username'>

                    <Form.Label className='label'>USERNAME </Form.Label>
                    <Form.Control type='text' className='input' placeholder='Username' name='username' onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='label'>PASSWORD </Form.Label>
                    <Form.Control type="password" className='input' placeholder="Password" name='password' onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" className='btn btn-primary' type="submit" onClick={handleSubmit}
                    disabled={!formData.username || !formData.password}>
                    Submit
                </Button>
            </Form>
        </StyledLogin>
    )
}

export default Login