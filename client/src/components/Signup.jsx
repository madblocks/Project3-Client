
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

  width: 450px;
  height: 700px;
  background: rgb(19,38,79);
  background: linear-gradient(180deg, rgba(19,38,79,1) 0%, rgba(22,147,198,1) 52%, rgba(255,255,255,0) 82%);
  margin: auto;
  border-radius: 10px;
  padding-left: 10px;
  color: white;
  margin-top: 50px;
  padding-top: 17px;


  .mb-3 {
      height: 40px;  
  }
  .input {
      width: 80%;
      height: 30px;
      border-radius: 10px;
      margin-left: 30px;
      background: rgba(255,255,255,.2);
      border: none;
  }
  .btn {
      width: 100px;
      height: 35px;
      border-radius: 10px;
      background: rgba(22, 46, 110, 0.895);
      border: none; 
      margin-left: -23px;
  }
  .label{
    margin-left: -280px;
    line-height: 5px;
  }
  .e_label{
    margin-left: -320px;
    line-height: 5px;
  }
  .p_label{
    margin-left: -210px;
    line-height: 5px;
  }

h1{
  padding-bottom: 25px;
}`;



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


        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
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