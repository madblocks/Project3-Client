
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth';

const StyledWrapper = styled.div `
  .input{
    padding: 10px;
    height: 50px;
    width: 500px;
    margin: auto;
}

.btn{
  width: 100px;
}

h1{
  padding-bottom: 25px;
}

input{

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

    navigate('/login')
    
  }

  return(
    <StyledWrapper>

      <h1>Sign Up</h1>

      <h1 className='title'>Signup</h1>

      <Form>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label className='label'>USERNAME </Form.Label>
          <Form.Control type='text' className='input' placeholder='Username' name='username' onChange={handleChange}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Label className='label'>FIRST NAME </Form.Label>
          <Form.Control type='text' className='input' placeholder=' Firstname' name='firstName' onChange={handleChange}/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Label className='label'>LAST NAME </Form.Label>
          <Form.Control type='text' className='input' placeholder=' Lastname' name='lastName' onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='e_label'>EMAIL </Form.Label>
          <Form.Control type="email" className='input' placeholder="Enter email" name='email' onChange={handleChange}/>
          <br></br>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='label'>PASSWORD </Form.Label>
          <Form.Control type="password" className='input' placeholder="Password" name='password' onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label className='p_label'>CONFIRM PASSWORD </Form.Label>
          <Form.Control type="password" className='input' placeholder="Confirm Password" name='confirmPassword' onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" className='btn btn-primary' type="submit" onClick={handleSubmit}
          disabled={!allData.username || !allData.firstName || !allData.lastName || !allData.email || 
            !allData.password || !(allData.password === allData.confirmPassword)}>
          Submit
        </Button>
      </Form>
      <br/>
    </StyledWrapper>
  )
}

export default Signup