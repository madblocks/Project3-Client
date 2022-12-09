import { DataContext } from '../DataContext';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import Client from '../services/api';
import {Card, Modal, Dropdown, DropdownButton} from 'react-bootstrap'
import {Calendar} from 'react-calendar'
import {BsFillTrashFill} from 'react-icons/bs'
import {AiOutlineCalendar} from 'react-icons/ai'

const StyledProfile = styled.div`
background-color: #3A8E88;
.grid-container{
  height: 100vh;
  width:98%;
  margin: 10px;
  overflow-y:scroll;
}
.grid-container::-webkit-scrollbar{
  display:none
}
.grid{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(25vw, 1fr));
}
.editInput{
  width:50%;
  margin:10px;
}
`


export default function Profile() {

  const baseUrl = 'http://localhost:3001/'

  let navigate = useNavigate()
  const {user, authenticated} = useContext(DataContext)
  const [counter, setCounter] = useState(0)
  const [userEvents, setUserEvents] = useState([])
  const [comments, setComments] = useState([{user:{avatar:'', username:'',id:''}}])
  const [currentActivity, setCurrentActivity] = useState({name: '', owner: {username: ''}, eventLikedBy: [], img: [], activity:[{name:''}], latitude:'', longitude: '', recurring: '', attendees: [{username:''}]})
  const [showDetails, setShowDetails] = useState(false)
  const [showEdit, setShowEdit]= useState(false)
  const [newComment, setNewComment]= useState({
    body:'',
    userId:'',
    eventId:''
  })
  const [updatedEvent, setUpdatedEvent] = useState({
    name: 'Select an Activity',
    latitude: '',
    longitude: '',
    activityId: 0,
    date: new Date(),
    description:'',
    userId:'',
    city:'',
    state:'',
    reoccuring:'',
    eventId:''
  })
  let eventList = ["hiking","running","ultimate frisbee", "skiing", "mountain biking", "road biking", "kayaking", "whitewater rafting", "fishing", "bird watching"]
  const [dateNow, setDateNow] = useState(Date.now())
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const handleClose = () => {setShowDetails(false);setShowEdit(false);setComments([{user:{avatar:'', username:'',id:''}}])}  
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
    try{
  const res = await Client.get(`/api/comment/${currentActivity.id}`) 
  let results = res.data
  setComments(results)
  setDateNow(Date.now())
  setShowDetails(true)
    }catch (error){
      console.log("error getting comments")
    }
  }
else {
  console.log("error getting comments (else)")
}}

const addComment = async (e) => {
    e.preventDefault()
    const res = await Client.post(`api/comment`, newComment)
    setNewComment({
      body:'',
    userId:'',
    eventId:''
    })
}

const addDetails = (activity) => {
  setCurrentActivity(activity)
  getEventComments();
}
const editEventButton = (activity) => {
  setUpdatedEvent(activity);
  setCurrentActivity(activity);
  setShowEdit(true)
}
const setDate= (e)=> {
  setUpdatedEvent({...updatedEvent, date: e})
}
const handleChange = (e) =>{
  setUpdatedEvent({...updatedEvent, [e.target.name]: e.target.value})
}

const deleteEvent = async(activity)=>{
  try{
    console.log(activity)
    const res = await Client.delete(`api/event/${activity.id}`)
    alert("Event Deleted!")
  }
  catch (error){
    alert("An Error Occured")
  }

}

const handleSubmit = async (e) =>{
  e.preventDefault();
  
  const activityId = eventList.indexOf(updatedEvent.name) + 1;
  setUpdatedEvent({...updatedEvent,  activityId: activityId})
  try{
    console.log(updatedEvent)
  const res = await Client.put(`api/event/${currentActivity.id}`, updatedEvent )
  document.querySelector(".update-event-success").style.visibility= "visible"
  document.querySelector(".update-event-fail").style.visibility= "hidden"
  console.log(res)
  }
  catch (error){ 
      document.querySelector(".update-event-fail").style.visibility= "visible"
      document.querySelector(".update-event-success").style.visibility= "hidden"
}}

const updateGrid = () => {
  setCounter(counter+1);
}

useEffect(()=>{
  const getUserEvents = async () => {
    try{
    const res = await Client.get(`api/user/${user.username}`)
    let results = res.data
    setUserEvents(results[0].events)}
    catch (error) {
      throw error
    }
  }
getUserEvents();
},[counter]) 
return (user && authenticated) ? (
  <StyledProfile>
    <div style={{display:"flex", justifyContent:"space-between", position:"relative", top:"10px"}}>
      <Button style={{marginLeft: "10px", boxShadow:"2px 2px 2px black"}} onClick={updateGrid}>Reload Events</Button> 
      <h2 style={{fontFamily: 'Bangers, cursive', fontSize:"64px", margin:"0"}}>Your Events</h2> 
      <h4 style={{marginRight:"10px"}}>Welcome,<br/> {user ? user.username : 'friend'}</h4>
    </div>
    <div className="grid-container">
{/* Grid for Events */}
    { userEvents.length > 0 ? (
      <div className="grid">
        {userEvents.map((post, index) => (
        <Card key={index} style={{margin:"10px", border:"2px solid black", maxWidth:"400px"}}>
          <Card.Title style={{marginTop:"10px"}}>{post.name}</Card.Title>
          <div style={{display:"flex"}}>  
            <Button sz="sm" style={{margin: "0 90px 0 10px", border:"2px solid black"}} onClick={()=>editEventButton(post)}>Edit</Button>
            <a href={'https://www.google.com/maps/search/?api=1&query='+post.latitude +','+post.longitude+'&z=11'} target="_blank">Directions</a>
          </div>
          <Card.Subtitle>{new Date(Date.parse(post.date)).toLocaleString('en-US')}</Card.Subtitle>
          <Card.Body>{post.description}</Card.Body>
          <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
            <Button onClick={()=>addDetails(post)} style={{width: "40%", border:"2px solid black",  marginBottom: "10px"}}>Show Details</Button>
            <BsFillTrashFill className="trash" onClick={()=>deleteEvent(post)} style={{fontSize:"30px", cursor:"pointer"}}/>
          </div>
        </Card>
      ))}
      </div>
      ) : (<h1>Check out the map to find events, or host your own!</h1>)}
    </div>
{/* Details Modal */}
  <Modal show={showDetails} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{currentActivity.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h2 style={{marginBottom:"0"}}>{currentActivity.name}</h2>
      <div style={{fontSize:"12px", marginBottom: "20px"}}> Hosted By {user.username}</div>
      <h5 style={{margin:"0", position:"relative", top:"-10px"}}><AiOutlineCalendar style ={{marginRight: "6px"}}/>{new Date(Date.parse(currentActivity.date)).toLocaleString('en-US')} - recurring: {currentActivity.recurring}</h5>
      <p style={{border:"2px solid black", borderRadius:"10px", boxShadow:"2px 2px 2px black", padding:"6px"}}>{currentActivity.description}</p>
{/* Comments Rendering */}
    <h5>Comments <Button onClick={commentForm} >add</Button></h5>
      <form className="commentForm" style={{visibility:"hidden"}} onSubmit = {addComment}>
        <textarea style={{width: "100%"}} value={newComment.body} onChange={handleCommentChange}/>
        <Button type="submit">Submit</Button>
      </form>
    {comments.length > 0 ? (
    <div className="comment-box" style={{overflowY:"scroll", border:"1px solid black",borderRadius:"10px", height: "25vh", position:"relative", top:"-100px", margin:"0 auto"}}>
      {comments.map((comment,index)=>(
        <div key={index} style={{border: "2px solid black", borderRadius:"10px", padding: "2px 2px 2px 8px", margin:"10px"}}>
          <div style={{display:"flex"}}>
            <img src={`${baseUrl}${comment.user.avatar}`} style={{maxWidth: "20px", maxHeight:"20px", marginRight:"5px"}}/>
            <h5>{comment.user.username}</h5>
          </div>
          <p className="comment" style={{marginBottom:"0"}}> "{comment.body}"  </p>
          <p style={{margin:"0", color:"grey"}}><small>{((dateNow - Date.parse(comments[index].createdAt))/86400000) < 1 ? (Math.trunc((((dateNow - Date.parse(comments[index].createdAt))/3600000))) + " Hours Ago"):Math.trunc(((dateNow - Date.parse(comments[index].createdAt))/86400000))+ " Days Ago"}</small></p>
        </div>
    ))}
    </div>
    ) : (<h2>No Comments</h2>)}
    </Modal.Body>
  </Modal>
{/* Edit Form */}
        <Modal show ={showEdit} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit My Event -- {currentActivity.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit = {handleSubmit}>
                <Dropdown onSelect={(e)=>{setUpdatedEvent({...updatedEvent, name: e})}} style={{margin: "10px"}}>
                  <DropdownButton title={updatedEvent.name}>
                    { eventList.map((event, index)=>(
                      <Dropdown.Item key={index} eventKey={event}>{event}</Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Dropdown>
                <Calendar onChange={setDate} />
              <textarea placeholder="description" style={{marginTop:"10px", width: "100%", height: "15vh"}} name="description" onChange={handleChange}></textarea>
              <div style={{display: "flex",flexDirection:"column", margin:"10px 0 10px 0"}}>
                    <input type="text" style={{marginTop:"10px", width:"50%"}} placeholder ="latitude" name="latitude" onChange={handleChange}/>
                    <input type="text" style={{marginTop:"10px", width:"50%"}} placeholder="longitude" name="longitude" onChange={handleChange}/>
                    <input type="text" style={{marginTop:"10px", width:"50%"}} placeholder="city" name="city" onChange={handleChange}/>
                    <input type="text" style={{marginTop:"10px", width:"50%"}} placeholder="state" name="state" onChange={handleChange}/>
              </div>
            <Button type="submit">Edit!</Button>
            </form>
            </Modal.Body>
            <h4 className = "update-event-success" style={{visibility:"hidden"}}>Edit Successful</h4>
            <h4 className = "update-event-fail" style={{visibility:"hidden"}}>Error Occured, Try Again</h4>
        </Modal>
  </StyledProfile>
        ) : (
        <div className = 'protected'>
          <h3>Oops! You must be signed in to do that!</h3>
          <Button variant="primary" className='btn btn-primary' onClick={()=>navigate('/login')}> Sign In </Button>
        </div>
  )

}
