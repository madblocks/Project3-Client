import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import styled from 'styled-components'

const Landing = (props) =>{

const StyledWrapper = styled.div `

.landing-container{
    border: 2px solid black;
    height: 10vh;
    display: flex;
    flex-direction: column;
}
.map{
    height: 500px;
    width: 500px;
    margin: 10px;
}
.search{
    margin: 10px;
    width: 500px;
}
`;

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