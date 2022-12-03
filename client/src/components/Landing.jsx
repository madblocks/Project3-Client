import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl } from 'react-leaflet'
import {icon, map} from 'leaflet'
import styled from 'styled-components'
import { useState, useContext, useEffect } from 'react'
import  Button  from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { DataContext } from '../DataContext' 
import axios from 'axios'
import Client from '../services/api'

const StyledWrapper = styled.div `
.landing-container{
    height: 80vh;
    display: flex;
    flex-direction: column;
    
}
.map{
    height: 600px;
    width: 600px;
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
}`;

const Landing = (props) =>{

    const map=useMap();
    const {isLoggedIn, setLoggedIn} = useContext(DataContext)
    const [searchCriteria, setSearchCriteria] = useState([])
    const [activeEvent, setActiveEvent] = useState(null)
    const [currentSearch, setCurrentSearch] = useState([])
    const [allEvents, setAllEvents] = useState([])
    const [mapRendered, setMapRendered] = useState(0)
    let hiking = [], running = [], ultimate = [], skiing = [], mountainBiking = [], roadBiking = [], kayaking = [], rafting = [], fishing = [], birdWatching = [];
    const [fishing1, setFishing] = useState([])
    
    const detailsStyle = {
        border: "2px solid black",
        width: "20vw",
        height: "550px",
        position: "relative",
        left: "650px",
        bottom: "600px"
    }

    const addComment = () => {
        //check if logged in, if so, allow them to add comment
        //if not logged in, route to login page
    }
    const adjustLike = () => {
        //check if logged in, if not send them to login
        //else, check if already liked - remove the like, else add the like
    }

//store locations in variable
//map through locations with <Marker/> component. Marker needs key + position object (coordinates)
//onclick listener -> set active park
//activePark &&  (<Popup position object, onclose event -> setActivePark(null))></Popup>)
//
    const [showDetails, setShowDetails] = useState(false)
    const handleShow = () => setShowDetails(true);
    const handleClose = () => setShowDetails(false)

useEffect(()=> {
const handleEvents = async () => {
    const getEvents = async () => {
    try {
        const res = await Client.get('api/event')
        return res.data
    } catch (error) {throw error}
    }
    const events = await getEvents();
    setAllEvents(events)
}
handleEvents()
const sortEvents = (array) => {
    for (let i=0; i<array.length; i++){
            if (array[i].activityId === 1) {
                hiking.push(array[i]);
            } else if (array[i].activityId === 2) {
                running.push(array[i]);
            } else if (array[i].activityId === 3) {
                ultimate.push(array[i]);
            } else if (array[i].activityId === 4) {
                skiing.push(array[i]);
            } else if (array[i].activityId === 5) {
                mountainBiking.push(array[i]);
            } else if (array[i].activityId === 6) {
                roadBiking.push(array[i]);
            } else if (array[i].activityId === 7) {
                kayaking.push(array[i]);
            } else if (array[i].activityId === 8) {
                rafting.push(array[i]);
            } else if (array[i].activityId === 9) {
                setFishing(fishing1 => [...fishing1, array[i]])
            } else if (array[i].activityId === 10) {
                birdWatching.push(array[i]);
            }
        }
        console.log(fishing)
}
sortEvents(allEvents);

},[mapRendered])

const updateMap =() => {

    setMapRendered(mapRendered+1);
}

    return allEvents.length >= 1 ?  (
    <StyledWrapper>
    <div className="landing-container">
        <input type="text" placeholder="search" className="search"></input>need search button and create event button

        <h6 className='instructions'>click and drag to move, use scrollwheel to zoom</h6><button onClick = {updateMap}>update map</button>
        <div className="map-and-details">
        <MapContainer center={[35.591, -82.55]} zoom={11} className="map">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <LayersControl position="topright">
            <LayersControl.Overlay checked name="Fishing">
                {fishing1.map(event => (
                    <Marker key={event.id} position={[event.latitude, event.longitude]}>
                        <Popup>
                        <h2 style={{margin:"0"}}>{event.name}</h2><br /> 
                        <h5 style={{margin:"0", position:"relative", top:"-10px"}}>Liked by XX Members</h5><br/>
                        <h5 style={{margin:"0", position:"relative", top:"-10px"}}>{event.date}</h5>
                        <Button variant = "primary" onClick={handleShow}>
                            show details
                        </Button>
                    </Popup>
                    </Marker>
                ))}
            </LayersControl.Overlay>
        </LayersControl>
        </MapContainer>
        <Modal show={showDetails} onHide={handleClose} style={detailsStyle}>
            <Modal.Header>
                <Modal.Title>Activity Name<Button onClick={handleClose} style={{float: "right"}}>close</Button></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 style={{margin:"0"}}>Liked by XX Members</h6> <br/>
                <h5 style={{margin:"0", position:"relative", top:"-10px"}}>Date and Time</h5>
                <h4>Description</h4>
                <p>Description Body</p>
                <h5>Comments <Button onClick={addComment}>+</Button></h5>
                Map Comments Here<br/>
                <Button onClick={adjustLike}>Like</Button>
            </Modal.Body>
        </Modal>

        </div>
        
    </div>
    </StyledWrapper>
    ) : <div><h1>Loading...</h1></div>
}

export default Landing