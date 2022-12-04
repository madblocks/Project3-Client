import { DataContext } from '../DataContext';
import { useState, useContext } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';

const StyledProfile = styled.div`

`

export default function Profile() {
  let navigate = useNavigate()
  const {authenticated, setAuth} = useContext(DataContext)
  const {user, setUser} = useContext(DataContext);


        return (user && authenticated) ? (
          <StyledProfile>
            <h1>Welcome, {user ? user.username : 'friend'}</h1>
            <div className="grid col-4">
              {/* {posts.map((post) => (
                <div className="card" key={post.id}>
                  <h3>{post.title}</h3>
                  <div>
                    <img src={post.image} alt="post"/>
                  </div>
                  <p>{post.body.substring(0, 80)}...</p>
                </div>
              ))} */}
            </div>
          </StyledProfile>
        ) : (
        <div className = 'protected'>
          <h3>Oops! You must be signed in to do that!</h3>
          <Button variant="primary" className='btn btn-primary' onClick={()=>navigate('/login')}> Sign In </Button>
        </div>
  )

}
