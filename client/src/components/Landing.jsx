import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl } from 'react-leaflet'
import {icon} from 'leaflet'
import styled from 'styled-components'
import { useState, useContext, useEffect } from 'react'
import  Button  from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { DataContext } from '../DataContext' 

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
    width:80%;
    border:2px solid black;
    display:flex;
    flex-direction: row;
}`;

const Landing = (props) =>{

    const {isLoggedIn, setLoggedIn} = useContext(DataContext)
    const [searchCriteria, setSearchCriteria] = useState([])
    const [activePark, setActivePark] = useState(null)
    const [currentSearch, setCurrentSearch] = useState([])
    
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
        //useEffect to track which boxes are checked / current search criteria
    },[])

    return(
    <StyledWrapper>
    <div className="landing-container">
        <input type="text" placeholder="search" className="search"></input>

        <h6 className='instructions'>click and drag to move, use scrollwheel to zoom</h6>
        <div className="map-and-details">
        <MapContainer center={[35.591, -82.55]} zoom={13} className="map">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <LayersControl position="topright">
            <LayersControl.Overlay  checked name="pins"> 
                <Marker position={[35.591, -82.55]}>
                    <Popup>
                        <h2 style={{margin:"0"}}>Acitivity Name</h2><br /> 
                        <h5 style={{margin:"0", position:"relative", top:"-10px"}}>Liked by XX Members</h5><br/>
                        <h5 style={{margin:"0", position:"relative", top:"-10px"}}>Date and Time</h5>
                        <Button variant = "primary" onClick={handleShow}>
                            show detials
                        </Button>
                    </Popup>
                </Marker>
            </LayersControl.Overlay>
        </LayersControl>
        </MapContainer>
        <Modal show={showDetails} onHide={handleClose} style={detailsStyle}>
            <Modal.Header>
                <Modal.Title>Activity Name<Button onClick={handleClose} style={{marginLeft: "75px"}}>close</Button></Modal.Title>
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
    )
}

export default Landing