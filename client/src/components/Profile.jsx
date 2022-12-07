import { DataContext } from '../DataContext';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Client, { BASE_URL } from '../services/api';

const StyledProfile = styled.div`
.grid-container{
  border:2px solid black;
  height: 75vh;
  width:70%;
  margin: 0 0 0 10px;
  overflow-y:scroll;
  border-radius: 10px;
}
.grid-container::-webkit-scrollbar{
  display:none
}
.grid{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(25vw, 1fr));
}
`


export default function Profile() {

  let navigate = useNavigate()
  const {user, authenticated} = useContext(DataContext)

        return (user && authenticated) ? (
          <StyledProfile>
            <h1>Welcome, {user ? user.username : 'friend'}</h1>
            <img href={user.avatar} /> 
            <h2>bio: {userInfo.bio}</h2>
            <div className="grid col-4">
              {/* {posts.map((post) => (
                <div className="card" key={post.id}>
                  <h3>{post.title}</h3>
                  <div>
                    <img src={post.image} alt="post"/>
            <h1 style={{width:"100%"}}>Welcome, {user ? user.username : 'friend'} <GrUserSettings style={{float:"right", marginRight:"20px"}}/></h1>
            <div className="grid-container">
              <h5>My Events</h5>

{/* Grid for Events */}
              <div className="grid">
              {userEvents.map((post, index) => (
                <Card key={index} style={{margin:"10px", border:"2px solid black"}}>
                  <Card.Header>{post.name}</Card.Header>
                  <Card.Title>{post.name}</Card.Title>
                  <div style={{display:"flex"}}>  
                    <Button sz="sm" style={{margin: "0 90px 0 10px", border:"2px solid black"}} onClick={()=>editEventButton(post)}>Edit</Button>
                  <a href={'https://www.google.com/maps/search/?api=1&query='+post.latitude +','+post.longitude+'&z=11'} target="_blank">Directions</a>
                  </div>
                  <Card.Subtitle>{new Date(Date.parse(post.date)).toLocaleString('en-US')}</Card.Subtitle>
                  <Card.Body>{post.description}</Card.Body>
                  
                  
                  <Button onClick={()=>addDetails(post)} style={{width: "50%", border:"2px solid black", alignSelf:"center", marginBottom: "10px"}}>Show Details</Button>
                  
                </Card>
              ))}
              </div>
            </div>
{/* Details Modal */}
            <Modal show={showDetails} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{currentActivity.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Hosted By {user.username}
                <h6 style={{margin:"0"}}>XX Likes</h6> <br/>
                <h5 style={{margin:"0", position:"relative", top:"-10px"}}>{new Date(Date.parse(currentActivity.date)).toLocaleString('en-US')}</h5>
                <p>{currentActivity.description}</p>

{/* Comments Rendering */}
                <h5>Comments <Button onClick={commentForm} >add</Button></h5>
                <form className="commentForm" style={{visibility:"hidden"}} onSubmit = {addComment}>
                  <textarea style={{width: "100%"}} value={newComment.body}onChange={handleCommentChange}/>
                  <Button type="submit">Submit</Button>
                </form>
                <div className="comment-box" style={{overflowY:"scroll", border:"2px solid black", height: "25vh", position:"relative", top:"-100px", margin:"0 auto"}}>
                {comments.map((comment,index)=>(
                  
                  <p key={index}>{comment.body}</p>
                ))}
                </div>
                <br/>
{/* Edit Form */}
                <Button onClick={adjustLike}>Like</Button>
            </Modal.Body>
        </Modal>
        <Modal show ={showEdit} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit My Event -- {currentActivity.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <Dropdown onSelect={(e)=>{setUpdatedEvent({...updatedEvent, name: e})}} style={{margin: "10px"}}>
                  <DropdownButton title={updatedEvent.name}>
                    { eventList.map((event, index)=>(
                      <Dropdown.Item key={index} eventKey={event}>{event}</Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Dropdown>
                <Calendar onChange={setDate} />
              </form>
              
            </Modal.Body>
        </Modal>



          </StyledProfile>
        ) : (
        <div className = 'protected'>
          <h3>Oops! You must be signed in to do that!</h3>
          <Button variant="primary" className='btn btn-primary' onClick={()=>navigate('/login')}> Sign In </Button>
        </div>
  )

}
