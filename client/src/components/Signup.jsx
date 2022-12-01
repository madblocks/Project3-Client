import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components'

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

    return(
        <StyledWrapper>
        <div className='container'>
            <h1>Signup</h1>
           
            <Form>
        <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>First Name </Form.Label>
            <Form.Control type='text' className='input' placeholder='Enter Your FirstName'/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Last Name </Form.Label>
            <Form.Control type='text' className='input' placeholder='Enter Your LastName'/>
        </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Email </Form.Label>
        <Form.Control type="email" className='input' placeholder="Enter email" />
        <br></br>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password </Form.Label>
        <Form.Control type="password" className='input' placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" className='btn btn-primary' type="submit">
        Submit
      </Button>
    </Form>
        </div>
        </StyledWrapper>
    )
}

export default Signup