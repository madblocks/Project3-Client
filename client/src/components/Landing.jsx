import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet'
import styled from 'styled-components'
import { useState, useContext, useEffect, useRef} from 'react'
import  Button  from 'react-bootstrap/Button'
import { DataContext } from '../DataContext' 
import Client from '../services/api'
import Modal from 'react-bootstrap/Modal'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Calendar from 'react-calendar'
import SearchBar from './SearchBar'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'

const StyledWrapper = styled.div `
.landing-container{
    height: 80vh;
    display: flex;
    flex-direction: column;
}
.map{
    height: 600px;
    width: 60vw;
    margin: 10px;
    border: 3px solid black;
}
.search{
    margin: auto;
    width: 500px;
}
.instructions{
    margin: auto;
    text-align: left;
    padding-left: 10px;
}
.map-and-details{
    width:100%;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
}`;
const Landing = (props) =>{



const {authenticated, setAuth} = useContext(DataContext)
const {user, setUser} = useContext(DataContext)
const [allEvents, setAllEvents] = useState({
        hiking: [],
        running: [],
        ultimate: [],
        skiing: [],
        mountainBiking: [],
        roadBiking: [],
        kayaking: [],
        rafting: [],
        fishing: [],
        birdWatching: []
    })
const [currentActivity, setCurrentActivity] = useState({name: '', owner: {username: ''}, eventLikedBy: []})
const [showDetails, setShowDetails] = useState(false)
const [showCreate, setShowCreate]= useState(false)
const [createEventForm, setCreateEventForm] = useState({
    name: 'Select an Activity',
    latitude: '',
    longitude: '',
    activityId: 0,
    date: new Date(),
    description:'',
    userId:'',
    city:'',
    state:'',
    reoccuring:''
})
let eventList = ["Hiking","Running","Ultimate Frisbee", "Skiing", "Mountain Biking", "Road Biking", "Kayaking", "Whitewater Rafting", "Fishing", "Bird Watching"]
const [eventCreate, setEventCreate] = useState(false)
const [search, setSearch] = useState({
        activityId: null,
        start: null,
        end: null,
        username: null,
    })
const [activityFilter, setActivityFilter] = useState({
            hiking: true,
            running: false,
            ultimate: true,
            skiing: false,
            mountainBiking: true,
            roadBiking: false,
            kayaking: false,
            rafting: false,
            fishing: false,
            birdWatching: true,
    })
const [comments, setComments] = useState([])
const [newComment, setNewComment]= useState({
        body:'',
        userId:'',
        eventId:''
})
const [dateNow, setDateNow] = useState(Date.now())

    // const [currentSearch, setCurrentSearch] = useState([])

    const toggleActivityFilter = (activityRef) => {
        // setActivityFilter(...activityFilter, [activityRef]: !activityFilter.activityRef)
    }

const handleClose = () => {setShowDetails(false); setShowCreate(false)}


const setDate= (e)=> {
    setCreateEventForm({...createEventForm, date: e})
}
const createEvent = () => {
    if (authenticated) {
        setCreateEventForm({...createEventForm, userId: user.id});
        setShowCreate(true)}
    else {(alert('You need to Sign Up or Log In first!'))}
    
    
}
const handleChange = (e) =>{
    setCreateEventForm({...createEventForm, [e.target.name]: e.target.value})
}
const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const activityId = eventList.indexOf(createEventForm.name) + 1;
    setCreateEventForm({...createEventForm, activityId: activityId})
    try{
    const res = await Client.post('api/event/', createEventForm )
    document.querySelector(".create-event-success").style.visibility= "visible"
    document.querySelector(".create-event-fail").style.visibility= "hidden"
    }
    catch (error){ 
        document.querySelector(".create-event-fail").style.visibility= "visible"
        document.querySelector(".create-event-success").style.visibility= "hidden"
}}
const commentForm = () => {
    if (authenticated) {
    document.querySelector(".commentForm").style.visibility= "visible";
    document.querySelector(".comment-box").style.top="20px";}
    else {alert("You need to log in before commenting!")}
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

const handleCommentChange = (e) => {
    setNewComment({...newComment, body: e.target.value, userId: user.id, eventId: currentActivity.id})
}

const addComment = async (e) => {
    e.preventDefault()
    const res = await Client.post(`api/comment`, newComment)
    console.log(res)
    setNewComment({
    body:'',
    userId:'',
    eventId:''
    })
    }

// const sinceAdded = () => {
//     let today = Date.now();
//     console.log(today);
//     let commentMade = Date.parse(comments[0].createdAt)
//     console.log(commentMade)
// }
    const adjustLike = () => {
        //check if logged in, if not send them to login
        //else, check if already liked - remove the like, else add the like
    }

const addDetails = (activity) => {
    setCurrentActivity(activity)
    getEventComments();
    setDateNow(Date.now())
    setShowDetails(true)
}

    useEffect(() => {
        const getEvents = async () => {
            const res = await Client.get('api/event?attendees=true&likes=true')
            let results = res.data
            setAllEvents(() => {
                let sortedResults =  {  hiking: [],
                                        running: [],
                                        ultimate: [],
                                        skiing: [],
                                        mountainBiking: [],
                                        roadBiking: [],
                                        kayaking: [],
                                        rafting: [],
                                        fishing: [],
                                        birdWatching: []}
                results.forEach((event) => {
                    sortedResults = {...sortedResults, [event.activity.ref]: [...sortedResults[event.activity.ref], event]}
                })
                return sortedResults
            })
        }
        getEvents()
    },[])

    return allEvents.hiking.length > 2 ? (
        <StyledWrapper>
        <div className="landing-container">
            <SearchBar/>
        <div className="map-and-details">
{/* Map */}
        <MapContainer center={[35.591, -82.55]} zoom={10} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                { allEvents.hiking.length > 2 &&
                    <LayersControl position="topright">
                        {Object.values(allEvents).map((eventType, index) => (
                            <LayersControl.Overlay key={index} layerId={index} 
                                // checked={activityFilter[eventType[1].activity.ref]} 
                                checked="true"
                                // name={`${eventType[0].activity.name}(${eventType.length})`} 
                                >
                                {/* {console.log(activityFilter[eventType[1].activity.ref])} */}
                                <LayerGroup>
                                    {eventType.map(event => (
                                        <Marker key={event.id} position={[event.latitude, event.longitude]}>
                                            <Popup>
                                                <h2 style={{margin:"0"}}>{event.name}</h2><br /> 
                                                <h5 style={{margin:"0", position:"relative", top:"-10px"}}>Liked by {event.eventLikedBy.length} Members</h5><br/>
                                                <h5 style={{margin:"0", position:"relative", top:"-10px"}}>{new Date(Date.parse(event.date)).toLocaleString('en-US')}</h5>
                                                <Button variant = "primary" onClick={()=>addDetails(event)} >
                                                    show details
                                                </Button>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </LayerGroup>           
                            </LayersControl.Overlay>
                        ))}
                    </LayersControl>
                }
        </MapContainer>
            <div style={{display:"flex", flexDirection:"column", width: "33vw" }}>
                <Button style={{width:"18vw"}} onClick={createEvent}>Create Event</Button> 
            </div>
            </div>
{/* Event Details Modal*/}
            <Modal show={showDetails} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentActivity.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hosted By {currentActivity.owner.username}
                    <h6 style={{margin:"0"}}>{currentActivity.eventLikedBy.length} Likes</h6> <br/>
                    <h5 style={{margin:"0", position:"relative", top:"-10px"}}>{new Date(Date.parse(currentActivity.date)).toLocaleString('en-US')}</h5>
                    <p>{currentActivity.description}</p>
{/* Comments Box In Event Details */}                    
                <h5>Comments <Button onClick={commentForm} >add</Button></h5>
                <form className="commentForm" style={{visibility:"hidden"}} onSubmit = {addComment}>
                    <textarea style={{width: "100%"}} value={newComment.body} onChange={handleCommentChange}/>
                    <Button type="submit">Submit</Button>
                </form>
                <div className="comment-box" style={{overflowY:"scroll", border:"2px solid black",borderRadius:"10px", height: "25vh", position:"relative", top:"-100px", margin:"0 auto"}}>
                {comments.map((comment,index)=>(
                    <div style={{border: "2px solid black", borderRadius:"10px", padding: "2px 2px 2px 8px"}}>
                    <p key={index} className="comment">{comment.body} </p>
                    <p><small>{((dateNow - Date.parse(comments[index].createdAt))/86400000) < 1 ? (Math.trunc((((dateNow - Date.parse(comments[index].createdAt))/3600000))) + " Hours Ago"):Math.trunc(((dateNow - Date.parse(comments[index].createdAt))/86400000))+ " Days Ago"}</small></p>
                    </div>
                ))}
                </div>
                <br/>
                    <Button onClick={adjustLike}>Like</Button>
                </Modal.Body>
            </Modal>
{/* Create Event Modal */}
            <Modal show ={showCreate} onHide={handleClose}>
                <Modal.Header closeButton>
                    Host an Event!
                </Modal.Header>
                <Modal.Body>
                    <Dropdown onSelect={(e)=>{setCreateEventForm({...createEventForm, name: e})}}>
                    <DropdownButton title={createEventForm.name}>
                        {eventList.map((item, index)=> (
                            <Dropdown.Item key={index} eventKey={item}>{item}</Dropdown.Item> 
                        ))}
                    </DropdownButton>
                    </Dropdown>
                    <br/>
                    <Calendar onChange={setDate} value={createEventForm.date}/>
                    <form onSubmit={handleSubmit}>
                <div style={{display: "flex",flexDirection:"column", margin:"10px 0 10px 0"}}>
                    <input type="text" style={{width:"50%", marginBottom: "10px"}} placeholder ="latitude" name="latitude" onChange={handleChange}/>
                    <input type="text" style={{width:"50%" , marginBottom: "10px"}} placeholder="longitude" name="longitude" onChange={handleChange}/>
                    <input type="text" style={{width:"50%" , marginBottom: "10px"}} placeholder="city" name="city" onChange={handleChange}/>
                    <input type="text" style={{width:"50%" , marginBottom: "10px"}} placeholder="state" name="state" onChange={handleChange}/>

                    <textarea placeholder="description" name="description" onChange={handleChange}/>
                </div>
                <Button type="submit">Add Event!</Button>
                </form>
                <h4 className="create-event-success" style={{visibility:"hidden"}}>Created!</h4>
                <h4 className="create-event-fail" style={{visibility:"hidden"}}>Please Fill Out All Fields!</h4>
                </Modal.Body>
            </Modal>                    
            </div>
        </StyledWrapper>
    )  : <h1>Loading</h1>

}

export default Landing