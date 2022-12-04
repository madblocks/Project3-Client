
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth';

const StyledWrapper = styled.div `

  width: 400px;
  height: 650px;
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



const Signup = (props) =>{

  let navigate = useNavigate()

  const [allData, setAllData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  } )

  const handleChange = (e) => {
    setAllData({...allData, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) =>{
    e.preventDefault()
    await RegisterUser({
      username: allData.username,
      firstName: allData.firstName,
      lastName: allData.lastName,
      email: allData.email,
      password: allData.password
    })
    // not sure if we need to clear form.  It seems to clear any with a re-render
    setAllData({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    navigate('/signin')
    
  }

  return(
    <StyledWrapper>
      <h1>Signup</h1>
      <Form>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username </Form.Label>
          <Form.Control type='text' className='input' placeholder='Username' name='username' onChange={handleChange}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Label>First Name </Form.Label>
          <Form.Control type='text' className='input' placeholder='Enter Your FirstName' name='firstName' onChange={handleChange}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Label>Last Name </Form.Label>
          <Form.Control type='text' className='input' placeholder='Enter Your LastName' name='lastName' onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email </Form.Label>
          <Form.Control type="email" className='input' placeholder="Enter email" name='email' onChange={handleChange}/>
          <br></br>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password </Form.Label>
          <Form.Control type="password" className='input' placeholder="Password" name='password' onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control type="password" className='input' placeholder="Confirm Password" name='confirmPassword' onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" className='btn btn-primary' type="submit" onClick={handleSubmit}
          disabled={!allData.username || !allData.firstName || !allData.lastName || !allData.email || 
            !allData.password || !(allData.password === allData.confirmPassword)}>
          Submit
        </Button>
      </Form>
    </StyledWrapper>
  )
}

export default Signup