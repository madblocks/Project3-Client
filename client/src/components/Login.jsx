import { DataContext } from '../DataContext';
import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import { LoginUser } from '../services/Auth';

const StyledLogin = styled.div `

  width: 400px;
  height: 300px;
  border: 2px solid black;
  background-color: lightblue;
  margin: auto;
  border-radius: 30px;

  .mb-3 {
      height: 70px; 
  }
  .input {
      width: 70%;
      height: 30px;
      border-radius: 30px;
  }
  .btn {
      width: 25%;
      height: 35px;
      border-radius: 30px;
  }
`;
//need feedback if username/password is incorrect
const Login = (props) =>{

    let navigate = useNavigate()
    const {setUser, setAuth} = useContext(DataContext)

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
        navigate('/profile')
    }

    return (
        <StyledLogin>
            <h1>Login</h1>
            <Form>
                <Form.Group className='mb-3' controlId='username'>
                    <Form.Label>Username </Form.Label>
                    <Form.Control type='text' className='input' placeholder='Username' name='username' onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password </Form.Label>
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