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

    background: #36B1F7;
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
        border-radius: 10px;
        box-shadow: 2px 2px 2px black;
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
    }
`;

const Landing = (props) =>{

    const baseUrl = 'http://localhost:3001/'

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
    const [currentActivity, setCurrentActivity] = useState({name: '', owner: {username: ''}, eventLikedBy: [], img: []})
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

  
    // const {authenticated, isLoggedIn} = useContext(DataContext)
    const [search, setSearch] = useState({
        name: null,
        activityId: null,
        start: null,
        end: null,
        username: null,
    })
    const [activityFilter, setActivityFilter] = useState({
            hiking: true,
            running: true,
            ultimate: true,
            skiing: true,
            mountainBiking: true,
            roadBiking: true,
            kayaking: true,
            rafting: true,
            fishing: true,
            birdWatching: true,
    })

    const [comments, setComments] = useState([{user:{avatar:'', username:'',id:''}}])
    const [newComment, setNewComment]= useState({
            body:'',
            userId:'',
            eventId:''
    })
    const [dateNow, setDateNow] = useState(Date.now())
    const [disable, setDisable]=useState(false)
    
    const handleClose = () => {setShowDetails(false); setShowCreate(false); setDisable(false)}

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
        else {setComments(["failed to load comments"])}
    }

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

    const adjustLike = async() => {
        if (authenticated) {
            console.log(currentActivity.eventLikedBy)
            for (let i=0; i<currentActivity.eventLikedBy.length;i++){
                if (user.id === currentActivity.eventLikedBy[i].id){
                    document.querySelector(".userLiked").style.visibility = "visible"
                } else {
                    setDisable(true);
                    const requestBody = {
                        userId: user.id,
                        eventId: currentActivity.id
                    }
                    const res = await Client.post(`api/eventLikes`,requestBody)
                    console.log(res)
                }
            }
        } else { (alert("Log in to like events!"))}
    }

    const addDetails = async (activity) => {
        setCurrentActivity(activity)
        await getEventComments();
        setDateNow(Date.now())
        setShowDetails(true)
    }

    const searchNow = () => {
        const getSearch = async () => {
            let queryString = ''
            const { name, activityId, start, end, username } = search
            if(name) queryString += `&name=${name}`
            if(activityId) queryString += `&activityId=${activityId}`
            if(start) queryString += `&start=${start}`
            if(end) queryString += `&end=${end}`
            if(username) queryString += `&username=${username}`
            const res = await Client.get(`api/event?attendees=true&likes=true${queryString}`)
            let results = res.data
            console.log(results)
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
        getSearch()
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


  return (allEvents.hiking.length + allEvents.running.length + allEvents.ultimate.length + allEvents.skiing.length + allEvents.mountainBiking.length
        + allEvents.roadBiking.length + allEvents.kayaking.length + allEvents.rafting.length + allEvents.fishing.length + allEvents.birdWatching.length > 0) ? (
        <StyledWrapper>
        <div className="landing-container">
            <div style={{height:"80px"}}>
                <SearchBar search={search} setSearch={setSearch} filter={activityFilter} setFilter={setActivityFilter} searchNow={searchNow}/>
            </div>
            
        <div className="map-and-details">
{/* Map */}
        <MapContainer center={[35.591, -82.55]} zoom={10} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <LayersControl position="topright">
                        {Object.values(allEvents).map((eventType, index) => (
                            <LayersControl.Overlay key={index} layerId={index} 
                                // checked={activityFilter[eventType[0].activity.ref]} 
                                checked="true"
                                name={`${eventList[index]} (${eventType.length})`} 
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
        </MapContainer>
            <div style={{display:"flex", flexDirection:"column", width: "33vw" }}>
                <Button style={{width:"18vw", position:"relative", top:"20px"}} onClick={createEvent}>Create Event</Button> 
            </div>
            </div>
{/* Event Details Modal*/}
            <Modal show={showDetails} onHide={handleClose}>
                <Modal.Header style={{justifyContent: "center", background:"#DEF2F0"}}>
                    {currentActivity.img.length>0 ? (<img style={{maxWidth:"70%", margin:"auto", border:"2px solid black", borderRadius:"10px", boxShadow: "2px 2px 2px black"}} src={`${baseUrl}${currentActivity.img[0]}`} alt="event"/>):null}
                </Modal.Header>
                <Modal.Body style={{}}>
                    <h2>{currentActivity.name}</h2>
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
                {comments[0].user ? (
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
                ) : (<h2>...Loading Comments</h2>)}
                <br/>
                    <Button onClick={adjustLike} className="likedButton" disabled={disable}>Like</Button>
                    <h4 className = "userLiked" style={{visibility: "hidden"}}>You've already Liked This Event</h4>
                    
                </Modal.Body>
            </Modal>
{/* Create Event Modal */}/img/skiing/les-anderson-R3tHkgwYaic-unsplash.jpg
            <Modal show ={showCreate} onHide={handleClose}>
                <Modal.Header closeButton >
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
                <h4 className="create-event-fail" style={{visibility:"hidden"}}>An Error Occured, Please Try Again</h4>
                </Modal.Body>
            </Modal>                    
            </div>
        </StyledWrapper>

    )  : <h1>Loading</h1>
}

export default Landing