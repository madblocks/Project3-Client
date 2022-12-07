import { DataContext } from '../DataContext';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Dropdown, Modal, DropdownButton } from 'react-bootstrap';
import Client from '../services/api'
import { GrUserSettings } from 'react-icons/gr'
import Calendar from 'react-calendar'



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
  const [userEvents, setUserEvents] = useState([])
  const [comments, setComments] = useState([])
  const [currentActivity, setCurrentActivity] = useState({name: '', user: {username: ''}})
  const [showDetails, setShowDetails] = useState(false)
  const [showEdit, setShowEdit]= useState(false)
  const [newComment, setNewComment]= useState({
    body:'',
    userId:'',
    eventId:''
  })
  const [updatedEvent, setUpdatedEvent] = useState({})
  let eventList = ["hiking","running","ultimate frisbee", "skiing", "mountain biking", "road biking", "kayaking", "whitewater rafting", "fishing", "bird watching"]




  const handleClose = () => {setShowDetails(false);setShowEdit(false)}  
  const commentForm = () => {
    document.querySelector(".commentForm").style.visibility= "visible";
    document.querySelector(".comment-box").style.top="20px";
  }
  const handleCommentChange = (e) => {
    setNewComment({...newComment, body: e.target.value, userId: user.id, eventId: currentActivity.id})
  }
  
const getEventComments = async() => {
  if (currentActivity.id) 
  {
  const res = await Client.get(`/api/comment/${currentActivity.id}`) 
  let results = res.data
  setComments(results)
  setShowDetails(true)
  }
else {setComments(["failed to load comments"])}}

const addComment = async (e) => {
    e.preventDefault()
    const res = await Client.post(`api/comment`, newComment)
    setNewComment({
      body:'',
    userId:'',
    eventId:''
    })
}
  const adjustLike = async () => {
    //check if logged in, if not send them to login
    //else, check if already liked - remove the like, else add the like
}

const addDetails = (activity) => {
  setCurrentActivity(activity)
  getEventComments();
}
const editEventButton = (activity) => {
  setUpdatedEvent(activity);
  setCurrentActivity(activity);
  console.log(updatedEvent)
  setShowEdit(true)
}
const setDate= (e)=> {
  setUpdatedEvent({...updatedEvent, date: e})
}

useEffect(()=>{
  const getUserEvents = async () => {
    const res = await Client.get(`api/user/${user.username}`)
    let results = res.data
    setUserEvents(results[0].events)
  const getLikes = async () => {
    const res = await Client.get(`api/eventlikes/counter`)
  }

  }
getUserEvents();
},[])





return (user && authenticated && userEvents.length > 0) ? (
          <StyledProfile>
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
