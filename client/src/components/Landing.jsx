import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import styled from 'styled-components'

const StyledWrapper = styled.div `

.landing-container{
    border: 2px solid black;
    height: 10vh;
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
`;
const Landing = (props) =>{

    return(
    <StyledWrapper>
    <div className="landing-container" style={{ height:"800px"}}>
        <input type="text" placeholder="search" className="search"></input>
        <MapContainer center={[51.505, -0.09]} zoom={13} className="map">
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker position={[51.505, -0.09]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>


        </MapContainer>

    </div>
    </StyledWrapper>
    )
}

export default Landing