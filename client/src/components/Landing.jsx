import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet'
import styled from 'styled-components'
import { useState, useContext, useEffect, useRef} from 'react'
import  Button  from 'react-bootstrap/Button'
import { DataContext } from '../DataContext' 
import Client from '../services/api'
import CreateEvent from './CreateEvent'
import Modal from 'react-bootstrap/Modal'

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
    margin: 10px;
    width: 500px;
}
.instructions{
    margin:0;
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

    const mapRef = useRef();
    const {isLoggedIn, setLoggedIn} = useContext(DataContext)
    const {authenticated, setAuth} = useContext(DataContext)
    const [eventCreate, setEventCreate] = useState(false)
    const [searchCriteria, setSearchCriteria] = useState([])
    const [activeEvent, setActiveEvent] = useState(null)
    const [currentSearch, setCurrentSearch] = useState([])
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

const [map, setMap] = useState(null)



const[usableDate, setUsableDate] = useState(null)
const fixDate = (randDate) => {
    const parsed = Date.parse(randDate) 
    setUsableDate(new Date(parsed).toLocaleString('en-US'))

}

const [currentActivity, setCurrentActivity] = useState({name: '', user: {username: ''}})
const [showDetails, setShowDetails] = useState(false)
const addDetails = (activity) => {
    setCurrentActivity(activity)
    setShowDetails(true)
    fixDate(activity.date)
}

const handleShow = () => setShowDetails(true);
const handleClose = () => setShowDetails(false)

const addComment = () => {
    //check if logged in, if so, allow them to add comment
    //if not logged in, route to login page
}
const adjustLike = () => {
    //check if logged in, if not send them to login
    //else, check if already liked - remove the like, else add the like
}


const createEvent = () => {
    isLoggedIn && authenticated ? (alert()) : (alert('login or auth failure'))
}


useEffect(() => {
    const getEvents = async () => {
        const res = await Client.get('api/event')
        let results = res.data
        setAllEvents(() => {
            let sortedResults = allEvents
            results.forEach((event) => {
                
                sortedResults = {...sortedResults, [event.activity.ref]: [...sortedResults[event.activity.ref], event]}
            })
            return sortedResults
        })
    }
    getEvents()
},[])

return (
    <StyledWrapper>
    <div className="landing-container">
        <input type="text" placeholder="search" className="search"></input>

        <h6 className='instructions'>click and drag to move, use scrollwheel to zoom</h6>
    <CreateEvent show={eventCreate}/>
    <div className="map-and-details">
    <MapContainer center={[35.591, -82.55]} zoom={10} className="map" ref={setMap}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            { allEvents.hiking.length > 2 &&
                <LayersControl position="topright">
                    {Object.values(allEvents).map((eventType, index) => (
                        <LayersControl.Overlay checked name={`${eventType[0].activity.name}(${eventType.length})`} key = {index} layerId = {index}>
                            <LayerGroup >
                                {eventType.map(event => (
                                    <Marker key={event.id} position={[event.latitude, event.longitude]}>
                                        <Popup>
                                            <h2 style={{margin:"0"}}>{event.name}</h2><br /> 
                                            <h5 style={{margin:"0", position:"relative", top:"-10px"}}>Liked by XX Members</h5><br/>
                                            <h5 style={{margin:"0", position:"relative", top:"-10px"}}>{event.date}</h5>
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
            <button style={{width:"18vw"}} onClick={createEvent}>Create Event</button> 
        </div>
        </div>
        <Modal show={showDetails} onHide={handleClose}>
            
            <Modal.Header closeButton>
                <Modal.Title>{currentActivity.name}</Modal.Title>
                <h5>Hosted By {currentActivity.user.username} </h5>
            </Modal.Header>
            <Modal.Body>
                <h6 style={{margin:"0"}}>Liked by XX Members</h6> <br/>
                <h5 style={{margin:"0", position:"relative", top:"-10px"}}>{usableDate}</h5>
                <p>{currentActivity.description}</p>
                <h5>Comments <Button onClick={addComment}>+</Button></h5>
                Map Comments Here<br/>
                <Button onClick={adjustLike}>Like</Button>
            </Modal.Body>
        </Modal>
        </div>
    </StyledWrapper>
)
}

export default Landing