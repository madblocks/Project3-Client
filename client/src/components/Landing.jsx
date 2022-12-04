import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet'
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


    const {isLoggedIn, setLoggedIn} = useContext(DataContext)
    const [searchCriteria, setSearchCriteria] = useState([])
    const [activeEvent, setActiveEvent] = useState(null)
    const [currentSearch, setCurrentSearch] = useState([])
    const [allEvents, setAllEvents] = useState([])
    const [mapRendered, setMapRendered] = useState(0)
    const [loading, setLoading] = useState(true)
    const [hiking, setHiking] = useState([])
    const [running, setRunning] = useState([])
    const [ultimate, setUltimate] = useState([])
    const [skiing, setSkiing] = useState([])
    const [mountainBiking, setMountainBiking] = useState([])
    const [roadBiking, setRoadBiking] = useState([])
    const [kayaking, setKayaking] = useState([])
    const [rafting, setRafting] = useState([])
    const [fishing, setFishing] = useState([])
    const [birdWatching, setBirdWatching] = useState([])
    const eventsArray = [hiking, running, ultimate, skiing, mountainBiking, roadBiking, kayaking, rafting, fishing, birdWatching]
    
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

const sortEvents =  (array) => {
    
    for (let i=0; i<array.length; i++){
            if (array[i].activityId === 1) {
                setHiking(hiking => [...hiking, array[i]])
            } else if (array[i].activityId === 2) {
                setRunning(running => [...running, array[i]])
            } else if (array[i].activityId === 3) {
                setUltimate(running => [...running, array[i]])
                ultimate.push(array[i]);
            } else if (array[i].activityId === 4) {
                setSkiing(skiing => [...skiing, array[i]])
            } else if (array[i].activityId === 5) {
                setMountainBiking(mountainBiking => [...mountainBiking, array[i]])
            } else if (array[i].activityId === 6) {
                setRoadBiking(roadBiking => [...roadBiking, array[i]])
            } else if (array[i].activityId === 7) {
                setKayaking(kayaking => [...kayaking, array[i]])
            } else if (array[i].activityId === 8) {
                setRafting(rafting => [...rafting, array[i]])
            } else if (array[i].activityId === 9) {
                setFishing(fishing => [...fishing, array[i]])
            } else if (array[i].activityId === 10) {
                setBirdWatching(birdWatching => [...birdWatching, array[i]])
            }
        }
    setLoading(false)
    console.log(fishing)
    }

handleEvents()
sortEvents(allEvents);


},[mapRendered])


const updateMap =() => {
    setMapRendered(mapRendered+1);
}


    return loading ? (  <div><h1>Loading...</h1>
    <button onClick = {updateMap}>update map</button></div>   ) : 
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
        {eventsArray.map(event => (
            <LayersControl.Overlay checked name={event} key = {event.id}>
                <LayerGroup >
                {event.map(activity => (
                    <Marker key={activity.id} position={[activity.latitude, activity.longitude]}>
                        <Popup>
                        <h2 style={{margin:"0"}}>{activity.name}</h2><br /> 
                        <h5 style={{margin:"0", position:"relative", top:"-10px"}}>Liked by XX Members</h5><br/>
                        <h5 style={{margin:"0", position:"relative", top:"-10px"}}>{activity.date}</h5>
                        <Button variant = "primary" onClick={handleShow}>
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

}

export default Landing