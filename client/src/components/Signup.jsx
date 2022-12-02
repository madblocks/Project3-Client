
import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { DataContext }from '../DataContext'


const StyledWrapper = styled.div `
.container{
    width: 400px;
    height: 500px;
    border: 2px solid black;
    background-color: lightblue;
    margin: auto;
    border-radius: 30px;
}
.mb-3{
    height: 70px; 
}
.input{
    width: 70%;
    height: 30px;
    border-radius: 30px;
}
.btn{
    width: 25%;
    height: 35px;
    border-radius: 30px;
}
`;



const Signup = (props) =>{

    const [allData, setAllData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    } )

    const {user,setUser} = useContext(DataContext);

let fName = ''
let lName = ''
let mail = ''
let pword = ''


  const handleSubmit =(e) =>{
    setAllData({...allData, firstName:fName, lastName:lName, email:mail, password:pword})
    sessionStorage.setItem('name',fName) 
    console.log(allData)
  }


  console.log('allData: ', allData)
    return(
        <StyledWrapper>
        <div className='container'>
            <h1>Signup</h1>
          
            <Form>
        <Form.Group className='mb-3' controlId='firstName'>
            <Form.Label>First Name </Form.Label>
            <Form.Control type='text' className='input' placeholder='Enter Your FirstName' onChange={(event) => fName = event.target.value}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='lastName'>
            <Form.Label>Last Name </Form.Label>
            <Form.Control type='text' className='input' placeholder='Enter Your LastName' onChange={(event) => lName = event.target.value}/>
        </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Email </Form.Label>
        <Form.Control type="email" className='input' placeholder="Enter email" onChange={(event) => mail = event.target.value}/>
        <br></br>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password </Form.Label>
        <Form.Control type="password" className='input' placeholder="Password" onChange={(event) => pword = event.target.value}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Link to='/profile'><Button variant="primary" className='btn btn-primary' type="submit" onClick={handleSubmit}>
        Submit
      </Button></Link>
    </Form>
        </div>
        </StyledWrapper>
    )
}

export default Signup