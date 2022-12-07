import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet'
import styled from 'styled-components'
import { useState, useContext, useEffect, useRef} from 'react'
import  Button  from 'react-bootstrap/Button'
import { DataContext } from '../DataContext' 
import Client from '../services/api'
import Modal from 'react-bootstrap/Modal'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
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

    // const mapRef = useRef();
    // const {authenticated, isLoggedIn} = useContext(DataContext)
    // const [eventCreate, setEventCreate] = useState(false)
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
    // const [activeEvent, setActiveEvent] = useState(null)
    // const [currentSearch, setCurrentSearch] = useState([])
    const [allEvents, setAllEvents] = useState({hiking: [],
                                            running: [],
                                            ultimate: [],
                                            skiing: [],
                                            mountainBiking: [],
                                            roadBiking: [],
                                            kayaking: [],
                                            rafting: [],
                                            fishing: [],
                                            birdWatching: []})

    const [map, setMap] = useState(null)

    const [currentActivity, setCurrentActivity] = useState({name: '', owner: {username: ''}})
    const [showDetails, setShowDetails] = useState(false)
    const addDetails = (activity) => {
        setCurrentActivity(activity)
        setShowDetails(true)
    }

    const toggleActivityFilter = (activityRef) => {
        // setActivityFilter(...activityFilter, [activityRef]: !activityFilter.activityRef)
    }

    const handleShow = () => setShowDetails(true);
    const handleClose = () => {setShowDetails(false); setShowCreate(false)}

    const addComment = () => {
        //check if logged in, if so, allow them to add comment
        //if not logged in, route to login page
    }
    const adjustLike = () => {
        //check if logged in, if not send them to login
        //else, check if already liked - remove the like, else add the like
    }

    const [showCreate, setShowCreate]= useState(false)
    const [createEventForm, setCreateEventForm] = useState({
        name: 'Select an Activity',
        lat: '',
        long: '',
        activityId: 0,
        date: new Date(),
        description:'',
        userId:'',
        city:'',
        state:'',
        reoccuring:''
    })
    let eventList = ["hiking","running","ultimate frisbee", "skiing", "mountain biking", "road biking", "kayaking", "whitewater rafting", "fishing", "bird watching"]
    const setDate= (e)=> {
        setCreateEventForm({...createEventForm, date: e})
    }
    const createEvent = () => {
        //isLoggedIn && authenticated ? (alert()) : (alert('login or auth failure'))
        setShowCreate(true)
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

    // useEffect(() => {
    //     const getEvents = async () => {
    //         const res = await Client.get('api/event?attendees=true&likes=true')
    //         let results = res.data
    //         setAllEvents(() => {
    //             let sortedResults = {}
    //             results.forEach((event) => {
    //                 sortedResults = {...sortedResults, [event.activity.ref]: Object.values(sortedResults[event.activity.ref]).push(event)}
    //             })
    //             return sortedResults
    //         })
    //     }
    //     getEvents()
    // },[])

    return (
        <StyledWrapper>
        <div className="landing-container">
            <SearchBar/>
        <div className="map-and-details">
        <MapContainer center={[35.591, -82.55]} zoom={10} className="map" ref={setMap}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                { allEvents.hiking.length > 2 &&
                    <LayersControl position="topright">
                        {Object.values(allEvents).map((eventType, index) => (
                            <LayersControl.Overlay key={index} layerId={index} 
                                checked={activityFilter[eventType[0].activity.ref]} 
                                name={`${eventType[0].activity.name}(${eventType.length})`} 
                                //onClick={()=>toggleActivityFilter(eventType[0].activity.ref)}
                                >
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
            <Modal show={showDetails} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentActivity.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Hosted By {currentActivity.owner.username}
                    <h6 style={{margin:"0"}}>XX Likes</h6> <br/>
                    <h5 style={{margin:"0", position:"relative", top:"-10px"}}>{new Date(Date.parse(currentActivity.date)).toLocaleString('en-US')}</h5>
                    <p>{currentActivity.description}</p>
                    <h5>Comments <Button onClick={addComment}>add</Button></h5>
                    Map Comments Here<br/>
                    <Button onClick={adjustLike}>Like</Button>
                </Modal.Body>
            </Modal>
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
                    
                    
                </Modal.Body>
            </Modal>
            </div>
        </StyledWrapper>
    )
}

export default Landing