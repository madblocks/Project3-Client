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
    
    const [map, setMap] = useState(null)
    const [layersReady, setLayersReady] = useState(false)
    const [layers, setLayers] = useState(null)

    

    

//store locations in variable
//map through locations with <Marker/> component. Marker needs key + position object (coordinates)
//onclick listener -> set active park
//activePark &&  (<Popup position object, onclose event -> setActivePark(null))></Popup>)
//
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

const createLayers = () => {

        return allEvents.length > 0 ? (
        <LayersControl position="topright">
        {eventsArray.map((event, index) => (
            <LayersControl.Overlay checked name={`${event[0].name}(${event.length})`} key = {index} layerId = {index}>
                <LayerGroup >
                {event.map(activity => (
                    <Marker key={activity.id} position={[activity.latitude, activity.longitude]}>
                        <Popup>
                        <h2 style={{margin:"0"}}>{activity.name}</h2><br /> 
                        <h5 style={{margin:"0", position:"relative", top:"-10px"}}>Liked by XX Members</h5><br/>
                        <h5 style={{margin:"0", position:"relative", top:"-10px"}}>{activity.date}</h5>
                        <Button variant = "primary" onClick={()=>addDetails(activity)}>
                            show details
                        </Button>
                    </Popup>
                    </Marker>
                ))}
                </LayerGroup>
            </LayersControl.Overlay>
            ))}
        </LayersControl>
        ) : false
    }


useEffect(()=>{
const handleEvents = async () => {

    const sortEvents =  async (array) => {
        
        for (let i=0; i<array.length; i++){
                if (array[i].activityId === 1) {
                    await setHiking(hiking => [...hiking, array[i]])
                } else if (array[i].activityId === 2) {
                    await setRunning(running => [...running, array[i]])
                } else if (array[i].activityId === 3) {
                    await setUltimate(ultimate => [...ultimate, array[i]])
                } else if (array[i].activityId === 4) {
                    await setSkiing(skiing => [...skiing, array[i]])
                } else if (array[i].activityId === 5) {
                    await setMountainBiking(mountainBiking => [...mountainBiking, array[i]])
                } else if (array[i].activityId === 6) {
                    await setRoadBiking(roadBiking => [...roadBiking, array[i]])
                } else if (array[i].activityId === 7) {
                    await setKayaking(kayaking => [...kayaking, array[i]])
                } else if (array[i].activityId === 8) {
                    await setRafting(rafting => [...rafting, array[i]])
                } else if (array[i].activityId === 9) {
                    await setFishing(fishing => [...fishing, array[i]])
                } else if (array[i].activityId === 10) {
                    await setBirdWatching(birdWatching => [...birdWatching, array[i]])
                }
            }
        setLoading(false)
    
        }

    const getEvents = async () => {
    try {
        const res = await Client.get('api/event')
        return res.data
    } catch (error) {throw error}
    }
    const layerGenerator = async () => {
        const temp = await createLayers()
        if (!temp){
            console.log('did not generate')
        }
        else {
        setLayers(temp)
        setLayersReady(true)
        }
    }

try{
    const events = await getEvents();
    setAllEvents(events)
    sortEvents(allEvents)
    layerGenerator()
    

} catch (error) {throw error}

}
handleEvents()
},[mapRendered])


return loading && !layersReady ? (  <div><h1>Loading...</h1>
    <button onClick = {updateMap}>update map</button></div>   ) : 
    
    <StyledWrapper>
    <div className="landing-container">
        <input type="text" placeholder="search" className="search"></input>need search button and create event button

        <h6 className='instructions'>click and drag to move, use scrollwheel to zoom</h6><button onClick = {updateMap} style={{width: "100px"}}>update map</button>
        <div className="map-and-details">
        
    <MapContainer center={[35.591, -82.55]} zoom={11} className="map" ref={setMap}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {layers}
    </MapContainer>
        <Details show ={showDetails} currentActivity={currentActivity} date={usableDate}/>
        
        </div>
    </div>
    </StyledWrapper>

}

export default Landing