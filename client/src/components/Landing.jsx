import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet'
import styled from 'styled-components'
import { useState, useContext, useEffect, useRef, useMemo} from 'react'
import  Button  from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { DataContext } from '../DataContext' 
import Client from '../services/api'
import Details from './Details'

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

    const mapRef = useRef();
    const {isLoggedIn, setLoggedIn} = useContext(DataContext)
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

    const [loading, setLoading] = useState(true)
  
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

const updateMap =() => {
    setMapRendered(mapRendered+1);
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

},[])

return !loading ? (  <div><h1>Loading...</h1>
    <button onClick = {updateMap}>update map</button></div>   ) : 
    
    <StyledWrapper>
    <div className="landing-container">
        <input type="text" placeholder="search" className="search"></input>need search button and create event button

        <h6 className='instructions'>click and drag to move, use scrollwheel to zoom</h6><button onClick = {updateMap} style={{width: "100px"}}>update map</button>
        <div className="map-and-details">
        
    <MapContainer center={[35.591, -82.55]} zoom={10} className="map" ref={setMap}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {/* {layers} */}
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
            }
    </MapContainer>
        <Details show ={showDetails} currentActivity={currentActivity} date={usableDate}/>
        
        </div>
    </div>
    </StyledWrapper>

}

export default Landing